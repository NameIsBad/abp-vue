using EasyAbp.Abp.SettingUi;
using Volo.Abp.Identity;
using Volo.Abp.Identity.Localization;
using Volo.Abp.Localization;
using Volo.Abp.Localization.ExceptionHandling;
using Volo.Abp.Modularity;
using Volo.Abp.TenantManagement;
using Volo.Abp.Validation;
using Volo.Abp.VirtualFileSystem;

namespace YZ.PrintStore.Identity
{
    [DependsOn(
        typeof(AbpValidationModule),
        typeof(AbpTenantManagementDomainSharedModule),
        typeof(AbpIdentityDomainSharedModule),
        typeof(AbpSettingUiDomainSharedModule)
    )]
    public class IdentityDomainSharedModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpVirtualFileSystemOptions>(options =>
            {
                options.FileSets.AddEmbedded<IdentityDomainSharedModule>();
            });

            Configure<AbpLocalizationOptions>(options =>
            {
                options.Resources
                    .Get<IdentityResource>()
                    .AddVirtualJson("/Localization/Identity");
            });

            Configure<AbpExceptionLocalizationOptions>(options =>
            {
                options.MapCodeNamespace("Identity", typeof(IdentityResource));
            });
        }
    }
}
