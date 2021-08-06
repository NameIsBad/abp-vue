using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Security.Claims;

public class SystemAdminPermissionValueProvider : PermissionValueProvider
{
  public SystemAdminPermissionValueProvider(IPermissionStore permissionStore)
      : base(permissionStore)
  {
  }

  public override string Name => "SystemAdmin";

  public override async Task<PermissionGrantResult> CheckAsync(PermissionValueCheckContext context)
  {
    var userId = context.Principal?.FindFirst(AbpClaimTypes.UserId)?.Value;

    if (userId == null)
    {
      return PermissionGrantResult.Undefined;
    }

    return await PermissionStore.IsGrantedAsync(context.Permission.Name, Name, userId)
        ? PermissionGrantResult.Granted
        : PermissionGrantResult.Undefined;
  }

  public override async Task<MultiplePermissionGrantResult> CheckAsync(PermissionValuesCheckContext context)
  {
    var permissionNames = context.Permissions.Select(x => x.Name).Distinct().ToArray();
    Check.NotNullOrEmpty(permissionNames, nameof(permissionNames));

    var userId = context.Principal?.FindFirst(AbpClaimTypes.UserId)?.Value;
    if (userId == null)
    {
      return new MultiplePermissionGrantResult(permissionNames);
    }

    return await PermissionStore.IsGrantedAsync(permissionNames, Name, userId);
  }
}