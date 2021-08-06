using System;
using System.Collections.Generic;
using System.Text;
using YZ.PrintStore.Localization;
using Volo.Abp.Application.Services;

namespace YZ.PrintStore
{
    /* Inherit your application services from this class.
     */
    public abstract class PrintStoreAppService : ApplicationService
    {
        protected PrintStoreAppService()
        {
            LocalizationResource = typeof(PrintStoreResource);
        }
    }
}
