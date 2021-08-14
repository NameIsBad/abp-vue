using Volo.Abp.Autofac;
using Volo.Abp.Modularity;
using YZ.PrintStore.AdministrationService;
using YZ.PrintStore.AdministrationService.EntityFrameworkCore;
using YZ.PrintStore.Identity;
using YZ.PrintStore.Identity.EntityFrameworkCore;

namespace YZ.PrintStore.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(IdentityApplicationContractsModule),
        typeof(IdentityEntityFrameworkCoreModule),
        typeof(AdministrationServiceApplicationContractsModule),
        typeof(AdministrationServiceEntityFrameworkCoreModule)
        )]
    public class PrintStoreDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
        }
    }
}
