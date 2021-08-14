using Volo.Abp.Application;
using Volo.Abp.Modularity;
using Volo.Abp.Authorization;
using Volo.Abp.Identity;
using Volo.Abp.TenantManagement;

namespace YZ.PrintStore.Identity
{
    [DependsOn(
     typeof(AbpIdentityApplicationContractsModule),
     typeof(IdentityDomainSharedModule),
     typeof(AbpTenantManagementApplicationContractsModule),
     typeof(AbpAuthorizationModule)
     )]
    public class IdentityApplicationContractsModule : AbpModule
    {

    }
}
