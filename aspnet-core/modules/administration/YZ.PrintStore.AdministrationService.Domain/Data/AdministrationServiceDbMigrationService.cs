using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.MultiTenancy;
using YZ.PrintStore.Shared.DbMigration;

namespace YZ.PrintStore.AdministrationService.Data
{
    public class AdministrationServiceDbMigrationService : BaseDbMigrationService
    {
        public override string ProjectFloderName => "administration";
        public override int Sort => 1;

        public ILogger<AdministrationServiceDbMigrationService> Logger { get; set; }
        private readonly IDataSeeder _dataSeeder;
        private readonly IEnumerable<IAdministrationServiceDbSchemaMigrator> _dbSchemaMigrators;
        private readonly ICurrentTenant _currentTenant;

        public AdministrationServiceDbMigrationService(
            IDataSeeder dataSeeder,
            IEnumerable<IAdministrationServiceDbSchemaMigrator> dbSchemaMigrators,
            ICurrentTenant currentTenant)
        {
            _dataSeeder = dataSeeder;
            _dbSchemaMigrators = dbSchemaMigrators;
            _currentTenant = currentTenant;

            Logger = NullLogger<AdministrationServiceDbMigrationService>.Instance;
        }

        public override async Task MigrateAsync()
        {
            var initialMigrationAdded = AddInitialMigrationIfNotExist();

            if (initialMigrationAdded)
            {
                return;
            }

            Logger.LogInformation("Started database migrations...");

            await MigrateDatabaseSchemaAsync();
            await SeedDataAsync();

            Logger.LogInformation($"Successfully completed host database migrations.");

            await MigrateDatabaseSchemaAsync();
            await SeedDataAsync();

            Logger.LogInformation("Successfully completed all database migrations.");
            Logger.LogInformation("You can safely end this process...");
        }

        private async Task MigrateDatabaseSchemaAsync()
        {
            Logger.LogInformation(
                $"Migrating schema for host database...");

            foreach (var migrator in _dbSchemaMigrators)
            {
                await migrator.MigrateAsync();
            }
        }

        private async Task SeedDataAsync()
        {
            Logger.LogInformation($"Executing host database seed...");
        }
    }
}
