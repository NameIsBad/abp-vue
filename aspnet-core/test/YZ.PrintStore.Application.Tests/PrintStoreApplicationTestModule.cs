using Volo.Abp.Modularity;

namespace YZ.PrintStore
{
    [DependsOn(
        typeof(PrintStoreApplicationModule),
        typeof(PrintStoreDomainTestModule)
        )]
    public class PrintStoreApplicationTestModule : AbpModule
    {

    }
}