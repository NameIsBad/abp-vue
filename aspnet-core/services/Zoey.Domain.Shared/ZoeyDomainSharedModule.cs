using EasyAbp.Abp.SettingUi;
using Zoey.Localization;
using Volo.Abp.AuditLogging;
using Volo.Abp.AuditLogging.Localization;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Identity.Localization;
using Volo.Abp.Localization;
using Volo.Abp.Localization.ExceptionHandling;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;
using Volo.Abp.Validation.Localization;
using Volo.Abp.VirtualFileSystem;

namespace Zoey;

[DependsOn(
    typeof(AbpFeatureManagementDomainSharedModule),
    typeof(AbpSettingManagementDomainSharedModule),
    typeof(AbpPermissionManagementDomainSharedModule),
    typeof(AbpAuditLoggingDomainSharedModule),
    //todo 7.0
    //typeof(AbpSettingUiDomainSharedModule),
    typeof(AbpTenantManagementDomainSharedModule),
    typeof(AbpIdentityDomainSharedModule)
)]
public class ZoeyDomainSharedModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpVirtualFileSystemOptions>(options =>
        {
            options.FileSets.AddEmbedded<ZoeyDomainSharedModule>();
        });

        Configure<AbpLocalizationOptions>(options =>
        {
            options.Resources
                .Add<ZoeyResource>("zh-Hans")
                .AddBaseTypes(typeof(AbpValidationResource))
                .AddVirtualJson("/Localization/Zoey");

            options.Resources
                .Get<AuditLoggingResource>()
                .AddVirtualJson("/Localization/Auditing");

            options.Resources
                .Get<IdentityResource>()
                .AddVirtualJson("/Localization/Identity");
        });

        Configure<AbpExceptionLocalizationOptions>(options =>
        {
            options.MapCodeNamespace("Zoey", typeof(ZoeyResource));
        });
    }
}