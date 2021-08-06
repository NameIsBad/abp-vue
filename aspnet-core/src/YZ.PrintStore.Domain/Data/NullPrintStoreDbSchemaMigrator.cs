using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace YZ.PrintStore.Data
{
    /* This is used if database provider does't define
     * IPrintStoreDbSchemaMigrator implementation.
     */
    public class NullPrintStoreDbSchemaMigrator : IPrintStoreDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}