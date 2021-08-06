using YZ.PrintStore.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace YZ.PrintStore.Permissions
{
    public class PrintStorePermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            var myGroup = context.AddGroup(PrintStorePermissions.GroupName);

            //Define your own permissions here. Example:
            //myGroup.AddPermission(PrintStorePermissions.MyPermission1, L("Permission:MyPermission1"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<PrintStoreResource>(name);
        }
    }
}
