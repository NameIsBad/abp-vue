using System.Threading.Tasks;

namespace YZ.PrintStore.Identity.Data
{
    public interface IIdentityDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
