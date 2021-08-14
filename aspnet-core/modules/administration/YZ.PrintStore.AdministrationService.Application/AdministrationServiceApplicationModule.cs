using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.AutoMapper;
using Volo.Abp.Caching.StackExchangeRedis;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;

namespace YZ.PrintStore.AdministrationService
{
    [DependsOn(
        typeof(AdministrationServiceDomainModule),
        typeof(AdministrationServiceApplicationContractsModule),
        typeof(AbpFeatureManagementApplicationModule),
        typeof(AbpCachingStackExchangeRedisModule),
        typeof(AbpPermissionManagementApplicationModule),
        typeof(AbpSettingManagementApplicationModule)
        )]
    public class AdministrationServiceApplicationModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAutoMapperObjectMapper<AdministrationServiceApplicationModule>();
            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddMaps<AdministrationServiceApplicationModule>(validate: true);
            });
        }
    }
}
