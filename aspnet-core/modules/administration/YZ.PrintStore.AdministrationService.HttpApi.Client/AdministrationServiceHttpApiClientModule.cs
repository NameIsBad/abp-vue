using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Http.Client;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;

namespace YZ.PrintStore.AdministrationService
{
    [DependsOn(
        typeof(AdministrationServiceApplicationContractsModule),
        typeof(AbpFeatureManagementHttpApiClientModule),
        typeof(AbpSettingManagementHttpApiClientModule),
        typeof(AbpPermissionManagementHttpApiClientModule),
        typeof(AbpHttpClientModule))]
    public class AdministrationServiceHttpApiClientModule : AbpModule
    {
        public const string RemoteServiceName = "AdministrationService";

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddHttpClientProxies(
                typeof(AdministrationServiceApplicationContractsModule).Assembly,
                RemoteServiceName
            );
        }
    }
}
