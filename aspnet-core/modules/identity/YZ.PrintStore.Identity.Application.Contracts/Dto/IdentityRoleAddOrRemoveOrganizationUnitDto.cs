using System;
using System.ComponentModel.DataAnnotations;

namespace YZ.PrintStore.Identity
{
    public class IdentityRoleAddOrRemoveOrganizationUnitDto
    {
        [Required]
        public Guid[] OrganizationUnitIds { get; set; }
    }
}
