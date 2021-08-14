using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Account;
using Volo.Abp.AutoMapper;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;

namespace YZ.PrintStore.Account
{
    [DependsOn(
         typeof(AbpAccountApplicationModule),
        typeof(AccountApplicationContractsModule),
        typeof(AbpIdentityDomainModule)
        )]
    [DependsOn(typeof(AbpAccountApplicationModule))]
    public class AccountApplicationModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAutoMapperObjectMapper<AccountApplicationModule>();
            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddMaps<AccountApplicationModule>(validate: true);
            });
        }
    }
}
