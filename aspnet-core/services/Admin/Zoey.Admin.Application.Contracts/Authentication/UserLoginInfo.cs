using System.ComponentModel.DataAnnotations;
using Volo.Abp.Auditing;

namespace Zoey.Admin.Authentication
{
    public class UserLoginInfoDto
    {
        [Required]
        [StringLength(255)]
        public string UserName { get; set; }

        [Required]
        [StringLength(32)]
        [DataType(DataType.Password)]
        [DisableAuditing]
        public string Password { get; set; }
    }
}