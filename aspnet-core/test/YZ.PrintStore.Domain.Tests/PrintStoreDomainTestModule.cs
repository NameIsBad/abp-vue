using YZ.PrintStore.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace YZ.PrintStore
{
    [DependsOn(
        typeof(PrintStoreEntityFrameworkCoreTestModule)
        )]
    public class PrintStoreDomainTestModule : AbpModule
    {

    }
}