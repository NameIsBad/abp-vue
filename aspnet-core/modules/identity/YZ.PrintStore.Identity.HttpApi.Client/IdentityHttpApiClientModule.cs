using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.TenantManagement;

namespace YZ.PrintStore.Identity
{
    [DependsOn(
       typeof(AbpIdentityHttpApiClientModule),
        typeof(AbpTenantManagementHttpApiClientModule),
       typeof(IdentityApplicationContractsModule))]
    public class IdentityHttpApiClientModule : AbpModule
    {
        public const string RemoteServiceName = "Identity";

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddHttpClientProxies(
                typeof(IdentityApplicationContractsModule).Assembly,
                RemoteServiceName
            );
        }
    }
}
