using Volo.Abp.Application;
using Volo.Abp.Modularity;
using Volo.Abp.Authorization;
using Volo.Abp.Account;

namespace YZ.PrintStore.Account
{
    [DependsOn(
        typeof(AbpDddApplicationContractsModule),
        typeof(AbpAccountApplicationContractsModule)
        )]
    public class AccountApplicationContractsModule : AbpModule
    {

    }
}
