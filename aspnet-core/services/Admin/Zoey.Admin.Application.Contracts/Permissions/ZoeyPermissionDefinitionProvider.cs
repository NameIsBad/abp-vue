using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Zoey.Localization;

namespace Zoey.Admin.Permissions
{
    public class ZoeyPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            var business = context.AddGroup(ZoeyPermissions.GroupName);
        }


        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<ZoeyResource>(name);
        }
    }
}