using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Identity;
using Volo.Abp.Security.Claims;
using IdentityUser = Volo.Abp.Identity.IdentityUser;

namespace YZ.PrintStore.Account
{
    [Area("login")]
    [Route("api/login")]
    public class LoginController : AbpController
    {
        private readonly JwtOptions _configuration;
        private readonly IdentityUserManager _userManager;
        private readonly IUserRoleFinder _userRoleFinder;

        public LoginController(IdentityUserManager userManager, IOptions<JwtOptions> configuration, IUserRoleFinder userRoleFinder)
        {
            _userManager = userManager;
            _configuration = configuration.Value;
            _userRoleFinder = userRoleFinder;
        }

        [HttpPost]
        public virtual async Task<AuthenticateResultModel> Login(UserLoginInfoDto login)
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
                result.AccessToken = GetToken(user, roles);
                return result;
            }
            throw new UserFriendlyException("账号或密码错误");
        }

        private string GetToken(IdentityUser user, string[] roles)
        {
            var accessToken = CreateAccessToken(CreateJwtClaims(CreateIdentityAsync(user, roles)));
            return accessToken;

            static ClaimsIdentity CreateIdentityAsync(IdentityUser userInfo, string[] roles)
            {
                var claims = new List<Claim>
                {
                    new Claim(AbpClaimTypes.UserId,userInfo.Id.ToString()),
                    new Claim(AbpClaimTypes.TenantId,userInfo.TenantId?.ToString() ?? string.Empty),
                    new Claim(AbpClaimTypes.Email,userInfo.Email),
                    new Claim(AbpClaimTypes.UserName,userInfo.UserName),
                    new Claim(AbpClaimTypes.Name,userInfo.Name),
                    new Claim(AbpClaimTypes.Role,JsonSerializer.Serialize(roles),JsonClaimValueTypes.JsonArray)
                };
                return new ClaimsIdentity(claims);
            }
        }

        private static List<Claim> CreateJwtClaims(ClaimsIdentity identity)
        {
            var claims = identity.Claims.ToList();
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

        private string CreateAccessToken(IEnumerable<Claim> claims, TimeSpan? expiration = null)
        {
            var now = DateTime.UtcNow;
            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _configuration.Issuer,
                audience: _configuration.Audience,
                claims: claims,
                notBefore: now,
                expires: now.Add(expiration ?? _configuration.Expiration),
                signingCredentials: _configuration.SigningCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
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
}