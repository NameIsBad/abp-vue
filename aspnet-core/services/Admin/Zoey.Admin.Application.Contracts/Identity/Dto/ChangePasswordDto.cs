using System.ComponentModel.DataAnnotations;
using Volo.Abp.Auditing;
using Volo.Abp.Identity;
using Volo.Abp.Validation;

namespace Zoey.Admin.Identity;

public class ChangePasswordDto
{
    [DisableAuditing]
    [DynamicStringLength(typeof(IdentityUserConsts), "MaxPasswordLength", null)]
    public string CurrentPassword { get; set; }

    [Required]
    [DisableAuditing]
    [DynamicStringLength(typeof(IdentityUserConsts), "MaxPasswordLength", null)]
    public string NewPassword { get; set; }
}