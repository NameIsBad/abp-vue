using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace YZ.PrintStore.Shared
{
    public interface IDbMigrationService : ITransientDependency
    {
        Task MigrateAsync();

        string ProjectFloderName { get; }

        int Sort { get; }
    }
}
