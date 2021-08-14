using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using YZ.PrintStore.Shared.DbMigration;

namespace YZ.PrintStore.Identity.EntityFrameworkCore
{
    /* This class is needed for EF Core console commands
     * (like Add-Migration and Update-Database commands) */
    public class IdentityServiceDbContextFactory : IDesignTimeDbContextFactory<IdentityServiceDbContext>
    {
        public IdentityServiceDbContext CreateDbContext(string[] args)
        {
            var configuration = DbContextFactoryHelper.BuildConfiguration();

            var builder = new DbContextOptionsBuilder<IdentityServiceDbContext>()
                .UseMySql(configuration.GetConnectionString("Default"), MySqlServerVersion.LatestSupportedServerVersion);

            return new IdentityServiceDbContext(builder.Options);
        }
    }
}
