using Volo.Abp.Account;
using Volo.Abp.AutoMapper;
using Volo.Abp.Caching.StackExchangeRedis;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;

namespace YZ.PrintStore
{
  [DependsOn(
      typeof(PrintStoreDomainModule),
      typeof(AbpAccountApplicationModule),
      typeof(PrintStoreApplicationContractsModule),
      typeof(AbpIdentityApplicationModule),
      typeof(AbpPermissionManagementApplicationModule),
      typeof(AbpTenantManagementApplicationModule),
      typeof(AbpFeatureManagementApplicationModule),
      typeof(AbpCachingStackExchangeRedisModule),
      typeof(AbpSettingManagementApplicationModule)
      )]
  public class PrintStoreApplicationModule : AbpModule
  {
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
      Configure<AbpAutoMapperOptions>(options =>
      {
        options.AddMaps<PrintStoreApplicationModule>();
      });
    }
  }
}
