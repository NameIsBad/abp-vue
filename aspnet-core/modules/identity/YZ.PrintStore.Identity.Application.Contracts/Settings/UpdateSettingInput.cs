using System.Collections.Generic;

namespace YZ.PrintStore.Identity.Settings
{
    public class UpdateSettingInput
    {
        public Dictionary<string, string> Values { get; set; }

        public UpdateSettingInput()
        {
            Values = new Dictionary<string, string>();
        }
    }
}