using EasyAbp.AbpHelper.Core.Commands.Generate.Crud;
using Serilog.Events;
using Serilog;
using Volo.Abp;
using Microsoft.Extensions.DependencyInjection;


Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
    .MinimumLevel.Override("Volo.Abp", LogEventLevel.Warning)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .CreateLogger();


using var application = await AbpApplicationFactory.CreateAsync<AbpHelperModule>(options =>
{
    options.UseAutofac();
    options.Services.AddLogging(c => c.AddSerilog());
});
await application.InitializeAsync();

var projectName = "Zoey";

string rootDirectory = Environment.CurrentDirectory;

var rootPath = rootDirectory.Substring(0, rootDirectory.IndexOf(@"\aspnet-core\"));
Console.WriteLine("项目根目录: " + rootPath);

var slnFile = Path.Combine(rootPath, "aspnet-core", $"{projectName}.sln");


Console.WriteLine("sln: " + slnFile);


if (!File.Exists(slnFile))
{
    Console.WriteLine(
        $"The solution file '{projectName}.sln' is not found in '{Path.Combine(rootPath, "aspnet-core")}'. Make sure you specific the right folder.");
    Console.ReadKey();
    return;
}

Console.WriteLine("请输入Entity实体名字:");


string entityName = Console.ReadLine();
var entityFilePath = Path.Combine(rootPath, "aspnet-core", "services", $"{projectName}.Domain");
if (!SearchFileRecursive(entityFilePath, $"{entityName}.cs"))
{
    Console.WriteLine(
        $"The entity file '{entityName}.cs' is not found in '{entityFilePath}'. Make sure you specific the right name.");
    Console.ReadKey();
    return;
}

Console.WriteLine("============开始生成中============");
var crud = application.ServiceProvider.GetService<CrudCommand>();

await crud.RunCommand(new CrudCommandOption
{
    Directory = rootPath,
    ProjectName = projectName,
    Entity = entityName,
    SkipUi = false,
    SkipLocalization = true
});
Console.WriteLine("============FINISHED!============");


static bool SearchFileRecursive(string directory, string targetFile)
{
    string filePath = Path.Combine(directory, targetFile);
    if (File.Exists(filePath))
    {
        return true;
    }


    string[] subDirectories = Directory.GetDirectories(directory);
    foreach (string subDirectory in subDirectories)
    {
        if (SearchFileRecursive(subDirectory, targetFile))
        {
            return true;
        }
    }

    return false;
}