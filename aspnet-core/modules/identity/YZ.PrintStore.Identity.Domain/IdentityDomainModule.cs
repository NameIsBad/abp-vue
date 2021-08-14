using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.TenantManagement;

namespace YZ.PrintStore.Identity
{
    [DependsOn(
        typeof(IdentityDomainSharedModule),
        typeof(AbpTenantManagementDomainModule),
        typeof(AbpIdentityDomainModule)
    )]
    public class IdentityDomainModule : AbpModule
    {

    }
}
