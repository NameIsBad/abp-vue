using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Zoey.Admin.Identity;

public class OrganizationUnitAddRoleDto
{
    [Required]
    public List<Guid> RoleIds { get; set; }
}