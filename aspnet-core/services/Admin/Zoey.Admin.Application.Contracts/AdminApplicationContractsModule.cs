using EasyAbp.Abp.SettingUi;
using Volo.Abp.Application;
using Volo.Abp.Authorization;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;

namespace Zoey.Admin;

[DependsOn(
    typeof(ZoeyDomainSharedModule),
    typeof(AbpDddApplicationContractsModule),
    typeof(AbpFeatureManagementApplicationContractsModule),
    typeof(AbpPermissionManagementApplicationContractsModule),
    typeof(AbpSettingManagementApplicationContractsModule),
    typeof(AbpIdentityApplicationContractsModule),
    typeof(AbpTenantManagementApplicationContractsModule),
    typeof(AbpSettingUiApplicationContractsModule),
    typeof(AbpAuthorizationModule)
)]
public class AdminApplicationContractsModule : AbpModule
{

}