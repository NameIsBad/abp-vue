using Volo.Abp.AuditLogging.Localization;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.VirtualFileSystem;

namespace YZ.PrintStore.AdministrationService
{
    [DependsOn(
        typeof(AdministrationServiceDomainSharedModule),
        typeof(AbpFeatureManagementApplicationContractsModule),
        typeof(AbpPermissionManagementApplicationContractsModule),
        typeof(AbpSettingManagementApplicationContractsModule)
    )]
    public class AdministrationServiceApplicationContractsModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
        }
    }
}
