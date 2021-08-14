using Localization.Resources.AbpUi;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.AuditLogging.Localization;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement.HttpApi;
using Volo.Abp.SettingManagement;
using YZ.PrintStore.AdministrationService.Localization;

namespace YZ.PrintStore.AdministrationService
{
    [DependsOn(
        typeof(AdministrationServiceApplicationContractsModule),
        typeof(AbpFeatureManagementHttpApiModule),
        typeof(AbpSettingManagementHttpApiModule),
        typeof(AbpPermissionManagementHttpApiModule),
        typeof(AbpAspNetCoreMvcModule))]
    public class AdministrationServiceHttpApiModule : AbpModule
    {
        public override void PreConfigureServices(ServiceConfigurationContext context)
        {
            PreConfigure<IMvcBuilder>(mvcBuilder =>
            {
                mvcBuilder.AddApplicationPartIfNotExists(typeof(AdministrationServiceHttpApiModule).Assembly);
            });
        }

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpLocalizationOptions>(options =>
            {
                options.Resources
                    .Get<AdministrationServiceResource>()
                    .AddBaseTypes(typeof(AuditLoggingResource), typeof(AbpUiResource));
            });
        }
    }
}
