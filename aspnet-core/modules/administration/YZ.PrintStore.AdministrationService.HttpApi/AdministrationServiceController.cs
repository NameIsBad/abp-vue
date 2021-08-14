using YZ.PrintStore.AdministrationService.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace YZ.PrintStore.AdministrationService
{
    public abstract class AdministrationServiceController : AbpController
    {
        protected AdministrationServiceController()
        {
            LocalizationResource = typeof(AdministrationServiceResource);
        }
    }
}
