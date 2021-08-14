using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.AutoMapper;
using Volo.Abp.Caching.StackExchangeRedis;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.TenantManagement;

namespace YZ.PrintStore.Identity
{
    [DependsOn(
       typeof(AbpIdentityApplicationModule),
        typeof(IdentityApplicationContractsModule),
        typeof(AbpCachingStackExchangeRedisModule),
        typeof(AbpTenantManagementApplicationModule),
        typeof(IdentityDomainModule)
        )]
    [DependsOn(typeof(AbpIdentityApplicationModule))]
    public class IdentityApplicationModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAutoMapperObjectMapper<IdentityApplicationModule>();
            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddProfile<IdentityApplicationAutoMapperProfile>(validate: true);
            });
        }
    }
}
