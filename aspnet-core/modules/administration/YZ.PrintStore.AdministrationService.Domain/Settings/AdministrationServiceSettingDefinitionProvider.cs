using EasyAbp.Abp.SettingUi;
using Volo.Abp.Localization;
using Volo.Abp.Settings;
using YZ.PrintStore.AdministrationService.Localization;

namespace YZ.PrintStore.AdministrationService.Settings
{
    public class AdministrationServiceSettingDefinitionProvider : SettingDefinitionProvider
    {
        public override void Define(ISettingDefinitionContext context)
        {
            /* Define module settings here.
             * Use names from AdministrationServiceSettings class.
             */
            //context.Add(new SettingDefinition("testName", "杜佳迪", L("MyAccount"), L("SamplePageMessage")).WithProperty(SettingUiConst.Group1, "Server"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<AdministrationServiceResource>(name);
        }
    }
}