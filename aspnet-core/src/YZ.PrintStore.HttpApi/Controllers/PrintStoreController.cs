using YZ.PrintStore.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace YZ.PrintStore.Controllers
{
    /* Inherit your controllers from this class.
     */
    public abstract class PrintStoreController : AbpController
    {
        protected PrintStoreController()
        {
            LocalizationResource = typeof(PrintStoreResource);
        }
    }
}