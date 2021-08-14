using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace YZ.PrintStore.Shared.DbMigration
{
    public abstract class BaseDbMigrationService : IDbMigrationService
    {
        public abstract string ProjectFloderName { get; }
        /// <summary>
        /// 初始化顺序
        /// </summary>
        public abstract int Sort { get; }

        public abstract Task MigrateAsync();

        protected bool AddInitialMigrationIfNotExist()
        {
            try
            {
                if (!DbMigrationsProjectExists())
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }

            try
            {
                if (!MigrationsFolderExists())
                {
                    AddInitialMigration();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Couldn't determinate if any migrations exist : " + e.Message);
                return false;
            }
        }

        protected bool DbMigrationsProjectExists()
        {
            var dbMigrationsProjectFolder = GetEntityFrameworkCoreProjectFolderPath();

            return dbMigrationsProjectFolder != null;
        }

        protected bool MigrationsFolderExists()
        {
            var dbMigrationsProjectFolder = GetEntityFrameworkCoreProjectFolderPath();

            return Directory.Exists(Path.Combine(dbMigrationsProjectFolder, "Migrations"));
        }

        protected void AddInitialMigration()
        {
            Console.WriteLine("Creating initial migration...");

            new CreateMigrationAndRunMigratorCommand().Execute(GetEntityFrameworkCoreProjectFolderPath());
        }

        protected string GetEntityFrameworkCoreProjectFolderPath()
        {
            var slnDirectoryPath = GetSolutionDirectoryPath();

            if (slnDirectoryPath == null)
            {
                throw new Exception("Solution folder not found!");
            }

            var srcDirectoryPath = Path.Combine(slnDirectoryPath, "modules", ProjectFloderName);

            return Directory.GetDirectories(srcDirectoryPath)
                .FirstOrDefault(d => d.EndsWith(".EntityFrameworkCore"));
        }

        protected string GetSolutionDirectoryPath()
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
