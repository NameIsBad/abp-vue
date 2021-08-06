using YZ.PrintStore.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace YZ.PrintStore.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(PrintStoreEntityFrameworkCoreModule),
        typeof(PrintStoreApplicationContractsModule)
        )]
    public class PrintStoreDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}
