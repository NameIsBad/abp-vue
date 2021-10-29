using System;
using System.IO;
using System.Linq;

namespace YZ.PrintStore.Shared.DbMigration
{
    internal class CreateMigrationAndRunMigratorCommand
    {
        public virtual async void Execute(string dbMigrationsFolder, string projectName)
        {
            var dbMigratorProjectPath = GetDbMigratorProjectPath(dbMigrationsFolder);
            if (dbMigratorProjectPath == null)
            {
                throw new Exception("DbMigrator is not found!");
            }

            if (!IsDotNetEfToolInstalled())
            {
                InstallDotnetEfTool();
            }

            var dbContextName = FindDbContextName(dbMigrationsFolder);

            var migrationOutput = AddMigrationAndGetOutput(dbMigrationsFolder, projectName, dbContextName, "Migrations");

            if (CheckMigrationOutput(migrationOutput))
            {
                // Migration added successfully
                //CmdHelper.RunCmd("cd \"" + Path.GetDirectoryName(dbMigratorProjectPath) + "\" && dotnet run");
            }
            else
            {
                var exceptionMsg = "Migrations failed! A migration command didn't run successfully:" +
                                   Environment.NewLine +
                                   Environment.NewLine + migrationOutput +
                                   Environment.NewLine;

                Console.WriteLine(exceptionMsg);
                throw new Exception(exceptionMsg);
            }
        }

        private string FindDbContextName(string dbMigrationsFolder)
        {
            var dbContext = Directory.GetFiles(dbMigrationsFolder, "*MigrationsDbContext.cs", SearchOption.AllDirectories)
                                .FirstOrDefault(fp => fp.EndsWith("MigrationsDbContext.cs")) ??
                            Directory.GetFiles(dbMigrationsFolder, "*DbContext.cs", SearchOption.AllDirectories)
                                .FirstOrDefault(fp => fp.EndsWith("DbContext.cs"));

            if (dbContext == null)
            {
                return null;
            }

            return Path.GetFileName(dbContext).RemovePostFix(".cs");
        }

        private static string AddMigrationAndGetOutput(string dbMigrationsFolder, string projectName, string dbContext, string outputDirectory)
        {
            var dbContextOption = string.IsNullOrWhiteSpace(dbContext)
                ? string.Empty
                : $"--context {dbContext}";

            var addMigrationCmd = $"cd \"{dbMigrationsFolder}\" && " +
                                  $"dotnet ef migrations add Initial{projectName.Substring(0, 1).ToUpper()}{projectName[1..]} --output-dir {outputDirectory} {dbContextOption}";

            return CmdHelper.RunCmdAndGetOutput(addMigrationCmd);
        }

        private static bool IsDotNetEfToolInstalled()
        {
            var output = CmdHelper.RunCmdAndGetOutput("dotnet tool list -g");
            return output.Contains("dotnet-ef");
        }

        private static bool CheckMigrationOutput(string output)
        {
            return output == null || (output.Contains("Done.") &&
                           output.Contains("To undo this action") &&
                           output.Contains("ef migrations remove"));
        }

        private void InstallDotnetEfTool()
        {
            Console.WriteLine("Installing dotnet-ef tool...");
            CmdHelper.RunCmd("dotnet tool install --global dotnet-ef");
            Console.WriteLine("dotnet-ef tool is installed.");
        }

        private static string GetDbMigratorProjectPath(string dbMigrationsFolderPath)
        {
            return Directory.GetFiles(dbMigrationsFolderPath).FirstOrDefault(f => f.EndsWith(".csproj"));
        }

        public string GetUsageInfo()
        {
            return string.Empty;
        }

        public string GetShortDescription()
        {
            return string.Empty;
        }
    }
}
