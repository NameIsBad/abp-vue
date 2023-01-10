using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;
using Zoey.Shared.Hosting.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Volo.Abp;
using Volo.Abp.Identity;
using Volo.Abp.Security.Claims;
using IdentityUser = Volo.Abp.Identity.IdentityUser;

namespace Zoey.Admin.Authentication;

[ApiExplorerSettings(GroupName = "oAuth")]
[Area("login")]
[Route("api/login")]
public class LoginController : AdminController
{
    private readonly JwtOptions _configuration;
    private readonly IdentityUserManager _userManager;
    private readonly IUserRoleFinder _userRoleFinder;
    public IdentitySecurityLogManager IdentitySecurityLogManager { get; set; }

    public LoginController(IdentityUserManager userManager, IOptions<JwtOptions> configuration, IUserRoleFinder userRoleFinder)
    {
        _userManager = userManager;
        _configuration = configuration.Value;
        _userRoleFinder = userRoleFinder;
    }

    [HttpPost]
    public virtual async Task<AuthenticateResultModel> Login([FromBody] UserLoginInfoDto login)
    {
        var result = new AuthenticateResultModel()
        {
            TokenType = "Bearer"
        };
        ValidateLoginInfo(login);

        var user = await ReplaceEmailToUsernameOfInputIfNeeds(login);
        var signInResult = await _userManager.CheckPasswordAsync(user, login.Password);
        if (signInResult)
        {
            var roles = await _userRoleFinder.GetRolesAsync(user.Id);
            result.AccessToken = await GetToken(user, roles);
            await IdentitySecurityLogManager.SaveAsync(new IdentitySecurityLogContext()
            {
                Identity = IdentitySecurityLogIdentityConsts.Identity,
                Action = "登录成功",
                UserName = login.UserName
            });
            return result;
        }
        throw new UserFriendlyException("账号或密码错误");
    }

    private async Task<string> GetToken(IdentityUser user, string[] roles)
    {
        var claims = await CreateJwtClaims(user, roles);
        var now = DateTime.UtcNow;
        var jwtSecurityToken = new JwtSecurityToken(
            issuer: _configuration.Issuer,
            audience: _configuration.Audience,
            claims: claims,
            notBefore: now,
            expires: now.Add(_configuration.Expiration),
            signingCredentials: _configuration.SigningCredentials
        );

        return new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
    }

    private async Task<List<Claim>> CreateJwtClaims(IdentityUser userInfo, string[] roles)
    {
        var claims = new List<Claim>
        {
            new (AbpClaimTypes.UserId,userInfo.Id.ToString()),
            new (AbpClaimTypes.TenantId,userInfo.TenantId?.ToString() ?? string.Empty),
            new (AbpClaimTypes.Email,userInfo.Email),
            new (AbpClaimTypes.UserName,userInfo.UserName),
            new (AbpClaimTypes.Name,userInfo.NormalizedUserName??""),
            new (AbpClaimTypes.Role,JsonSerializer.Serialize(roles),JsonClaimValueTypes.JsonArray)
        };
        var customUserClaims = await _userManager.GetClaimsAsync(userInfo);
        if (customUserClaims.Count > 0)
        {
            claims.AddRange(customUserClaims);
        }
        var nameIdClaim = claims.First(c => c.Type == ClaimTypes.NameIdentifier);

        // Specifically add the jti (random nonce), iat (issued timestamp), and sub (subject/user) claims.
        claims.AddRange(new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, nameIdClaim.Value),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.Now.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
        });

        return claims;
    }

    protected virtual async Task<IdentityUser> ReplaceEmailToUsernameOfInputIfNeeds(UserLoginInfoDto login)
    {
        var userByUsername = await _userManager.FindByNameAsync(login.UserName);
        if (userByUsername != null)
        {
            return userByUsername;
        }

        var userByEmail = await _userManager.FindByEmailAsync(login.UserName);
        if (userByEmail != null)
        {
            return userByEmail;
        }

        throw new UserFriendlyException("账号或密码错误");
    }

    protected virtual void ValidateLoginInfo(UserLoginInfoDto login)
    {
        if (login == null)
        {
            throw new ArgumentException(nameof(login));
        }

        if (login.UserName.IsNullOrEmpty())
        {
            throw new ArgumentNullException(nameof(login.UserName));
        }

        if (login.Password.IsNullOrEmpty())
        {
            throw new ArgumentNullException(nameof(login.Password));
        }
    }
}