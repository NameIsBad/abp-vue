using Volo.Abp.Settings;

namespace YZ.PrintStore.Settings
{
    public class PrintStoreSettingDefinitionProvider : SettingDefinitionProvider
    {
        public override void Define(ISettingDefinitionContext context)
        {
            //Define your own settings here. Example:
            //context.Add(new SettingDefinition(PrintStoreSettings.MySetting1));
        }
    }
}
