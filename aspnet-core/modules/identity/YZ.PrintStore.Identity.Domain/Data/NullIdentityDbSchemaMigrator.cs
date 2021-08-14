using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace YZ.PrintStore.Identity.Data
{
    /* This is used if database provider does't define
     * IPrintStoreDbSchemaMigrator implementation.
     */
    public class NullIdentityDbSchemaMigrator : IIdentityDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}