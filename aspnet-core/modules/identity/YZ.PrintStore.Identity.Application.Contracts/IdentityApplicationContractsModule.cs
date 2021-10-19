using EasyAbp.Abp.SettingUi;
using Volo.Abp.Authorization;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.TenantManagement;

namespace YZ.PrintStore.Identity
{
    [DependsOn(
     typeof(AbpIdentityApplicationContractsModule),
     typeof(IdentityDomainSharedModule),
     typeof(AbpTenantManagementApplicationContractsModule),
     typeof(AbpAuthorizationModule),
     typeof(AbpSettingUiApplicationContractsModule)
     )]
    public class IdentityApplicationContractsModule : AbpModule
    {

    }
}
