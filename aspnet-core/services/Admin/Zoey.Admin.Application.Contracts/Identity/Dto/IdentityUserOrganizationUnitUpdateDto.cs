using System;
using System.ComponentModel.DataAnnotations;

namespace Zoey.Admin.Identity;

public class IdentityUserOrganizationUnitUpdateDto
{
    [Required]
    public Guid[] OrganizationUnitIds { get; set; }
}