using YZ.PrintStore.AdministrationService.Localization;
using Volo.Abp.Application.Services;

namespace YZ.PrintStore.AdministrationService
{
    public abstract class AdministrationServiceAppService : ApplicationService
    {
        protected AdministrationServiceAppService()
        {
            LocalizationResource = typeof(AdministrationServiceResource);
            ObjectMapperContext = typeof(AdministrationServiceApplicationModule);
        }
    }
}
