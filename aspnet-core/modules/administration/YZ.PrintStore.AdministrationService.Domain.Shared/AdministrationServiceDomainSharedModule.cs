using EasyAbp.Abp.SettingUi;
using Volo.Abp.AuditLogging;
using Volo.Abp.AuditLogging.Localization;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Localization;
using Volo.Abp.Localization.ExceptionHandling;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.Validation.Localization;
using Volo.Abp.VirtualFileSystem;
using YZ.PrintStore.AdministrationService.Localization;

namespace YZ.PrintStore.AdministrationService
{
    [DependsOn(
        typeof(AbpFeatureManagementDomainSharedModule),
        typeof(AbpSettingManagementDomainSharedModule),
        typeof(AbpPermissionManagementDomainSharedModule),
        typeof(AbpAuditLoggingDomainSharedModule),
        typeof(AbpSettingUiDomainSharedModule)
        )]
    public class AdministrationServiceDomainSharedModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpVirtualFileSystemOptions>(options =>
            {
                options.FileSets.AddEmbedded<AdministrationServiceDomainSharedModule>();
            });

            Configure<AbpLocalizationOptions>(options =>
            {
                options.Resources
                    .Add<AdministrationServiceResource>("zh-Hans")
                    .AddBaseTypes(typeof(AbpValidationResource))
                    .AddVirtualJson("/Localization/AdministrationService");

                options.Resources
                    .Get<AuditLoggingResource>()
                    .AddVirtualJson("/Localization/Auditing");
            });

            Configure<AbpExceptionLocalizationOptions>(options =>
            {
                options.MapCodeNamespace("AdministrationService", typeof(AdministrationServiceResource));
            });
        }
    }
}
