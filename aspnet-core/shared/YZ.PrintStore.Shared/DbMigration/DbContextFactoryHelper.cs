using Microsoft.Extensions.Configuration;
using System.IO;
using System.Linq;

namespace YZ.PrintStore.Shared.DbMigration
{
    public static class DbContextFactoryHelper
    {
        public static IConfigurationRoot BuildConfiguration()
        {
            var rootPath = GetSolutionDirectoryPath();
            var builder = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(rootPath, "dbMigrator", "YZ.PrintStore.DbMigrator"))
                .AddJsonFile("appsettings.json", optional: false);

            return builder.Build();
        }

        private static string GetSolutionDirectoryPath()
        {
            var currentDirectory = new DirectoryInfo(Directory.GetCurrentDirectory());

            while (Directory.GetParent(currentDirectory.FullName) != null)
            {
                currentDirectory = Directory.GetParent(currentDirectory.FullName);

                if (Directory.GetFiles(currentDirectory.FullName).FirstOrDefault(f => f.EndsWith(".sln")) != null)
                {
                    return currentDirectory.FullName;
                }
            }

            return null;
        }
    }
}
