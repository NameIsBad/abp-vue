using System.Collections.Generic;

namespace Zoey.Admin.Identity;

public class UpdateSettingInput
{
    public Dictionary<string, string> Values { get; set; }

    public UpdateSettingInput()
    {
        Values = new Dictionary<string, string>();
    }
}