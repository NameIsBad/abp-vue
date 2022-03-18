using System.IO;
using Zoey.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Zoey.Admin.EntityFrameworkCore;

public class AdminHttpApiHostMigrationsDbContextFactory : IDesignTimeDbContextFactory<ZoeyDbContext>
{
    public ZoeyDbContext CreateDbContext(string[] args)
    {
        var configuration = BuildConfiguration();

        var builder = new DbContextOptionsBuilder<ZoeyDbContext>()
            .UseMySql(configuration.GetConnectionString("Default"), MySqlServerVersion.LatestSupportedServerVersion,
                option => { option.MigrationsAssembly("Zoey.Admin.HttpApi.Host"); });

        // var builder = new DbContextOptionsBuilder<ZoeyDbContext>().UseNpgsql(configuration.GetConnectionString("Default"), option =>
        // {
        //     option.MigrationsAssembly("Zoey.Admin.HttpApi.Host");
        // });

        return new ZoeyDbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", false);

        return builder.Build();
    }
}