using System.Threading.Tasks;

namespace YZ.PrintStore.Data
{
    public interface IPrintStoreDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
