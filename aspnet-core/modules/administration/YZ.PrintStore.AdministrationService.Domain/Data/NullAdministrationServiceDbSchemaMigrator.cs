using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace YZ.PrintStore.AdministrationService.Data
{
    /* This is used if database provider does't define
     * IPrintStoreDbSchemaMigrator implementation.
     */
    public class NullAdministrationServiceDbSchemaMigrator : IAdministrationServiceDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}