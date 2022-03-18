using System;
using System.ComponentModel.DataAnnotations;

namespace Zoey.Admin.Identity;

public class IdentityRoleAddOrRemoveOrganizationUnitDto
{
    [Required]
    public Guid[] OrganizationUnitIds { get; set; }
}