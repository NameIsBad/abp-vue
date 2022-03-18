using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Zoey.Admin.Identity;

public class OrganizationUnitAddUserDto
{
    [Required]
    public List<Guid> UserIds { get; set; }
}