using Snowflake.Core;
using Volo.Abp.DependencyInjection;

namespace Zoey.Shared.Application
{
    public class SnowflakeService : ISingletonDependency
    {
        private readonly IdWorker _worker;

        public SnowflakeService()
        {
            _worker = new IdWorker(1, 1);
        }

        public IdWorker Worker => _worker ?? new IdWorker(1, 1);
    }
}