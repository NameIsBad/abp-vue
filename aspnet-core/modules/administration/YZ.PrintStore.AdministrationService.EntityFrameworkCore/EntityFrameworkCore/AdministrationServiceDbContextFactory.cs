using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using YZ.PrintStore.Shared.DbMigration;

namespace YZ.PrintStore.AdministrationService.EntityFrameworkCore
{
    /* This class is needed for EF Core console commands
     * (like Add-Migration and Update-Database commands) */
    public class AdministrationServiceDbContextFactory : IDesignTimeDbContextFactory<AdministrationServiceDbContext>
    {
        public AdministrationServiceDbContext CreateDbContext(string[] args)
        {
            var configuration = DbContextFactoryHelper.BuildConfiguration();

            var builder = new DbContextOptionsBuilder<AdministrationServiceDbContext>()
                .UseMySql(configuration.GetConnectionString("Default"), MySqlServerVersion.LatestSupportedServerVersion);

            return new AdministrationServiceDbContext(builder.Options);
        }
    }
}
