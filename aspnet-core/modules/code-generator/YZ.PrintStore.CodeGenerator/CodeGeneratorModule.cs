using Microsoft.Extensions.DependencyInjection;
using RazorLight.Extensions;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Modularity;
using Volo.Abp.VirtualFileSystem;

namespace YZ.PrintStore.CodeGenerator
{
    [DependsOn(typeof(AbpAspNetCoreMvcModule))]
    public class CodeGeneratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpVirtualFileSystemOptions>(options =>
            {
                options.FileSets.AddEmbedded<CodeGeneratorModule>();
            });

            //var hostingEnvironment = context.Services.GetHostingEnvironment();

            context.Services.AddRazorLight()
                .UseMemoryCachingProvider()
                //.UseFileSystemProject(hostingEnvironment.WebRootPath);
                .UseEmbeddedResourcesProject(typeof(CodeGeneratorModule));
        }
    }
}
