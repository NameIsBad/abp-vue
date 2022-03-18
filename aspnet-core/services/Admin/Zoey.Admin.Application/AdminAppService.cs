using Zoey.Localization;
using Volo.Abp.Application.Services;

namespace Zoey.Admin;

public abstract class AdminAppService : ApplicationService
{
    protected AdminAppService()
    {
        LocalizationResource = typeof(ZoeyResource);
        ObjectMapperContext = typeof(AdminApplicationModule);
    }
}