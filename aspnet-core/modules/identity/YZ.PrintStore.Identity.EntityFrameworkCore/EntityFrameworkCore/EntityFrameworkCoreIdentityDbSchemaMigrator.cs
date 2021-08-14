using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using YZ.PrintStore.Identity.Data;
using YZ.PrintStore.Identity.EntityFrameworkCore;

namespace YZ.PrintStore.AdministrationService.EntityFrameworkCore
{
    public class EntityFrameworkCoreIdentityDbSchemaMigrator
        : IIdentityDbSchemaMigrator, ITransientDependency
    {
        private readonly IServiceProvider _serviceProvider;

        public EntityFrameworkCoreIdentityDbSchemaMigrator(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task MigrateAsync()
        {
            /* We intentionally resolving the TESTDbContext
             * from IServiceProvider (instead of directly injecting it)
             * to properly get the connection string of the current tenant in the
             * current scope.
             */

            await _serviceProvider
                .GetRequiredService<IdentityServiceDbContext>()
                .Database
                .MigrateAsync();
        }
    }
}
