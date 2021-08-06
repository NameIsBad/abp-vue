using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace YZ.PrintStore
{
    [Dependency(ReplaceServices = true)]
    public class PrintStoreBrandingProvider : DefaultBrandingProvider
    {
        public override string AppName => "PrintStore";
    }
}
