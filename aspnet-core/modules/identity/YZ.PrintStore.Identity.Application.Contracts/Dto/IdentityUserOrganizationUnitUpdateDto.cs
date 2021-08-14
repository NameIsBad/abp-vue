using System;
using System.ComponentModel.DataAnnotations;

namespace YZ.PrintStore.Identity
{
    public class IdentityUserOrganizationUnitUpdateDto
    {
        [Required]
        public Guid[] OrganizationUnitIds { get; set; }
    }
}
