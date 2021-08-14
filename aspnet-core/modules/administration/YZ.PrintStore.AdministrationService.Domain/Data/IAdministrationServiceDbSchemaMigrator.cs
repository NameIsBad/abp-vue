using System.Threading.Tasks;

namespace YZ.PrintStore.AdministrationService.Data
{
    public interface IAdministrationServiceDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
