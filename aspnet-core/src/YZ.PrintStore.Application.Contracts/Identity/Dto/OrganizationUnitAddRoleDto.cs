using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace YZ.PrintStore.Identity
{
    public class OrganizationUnitAddRoleDto
    {
        [Required]
        public List<Guid> RoleIds { get; set; }
    }
}
