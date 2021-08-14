using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace YZ.PrintStore.Identity
{
    public class OrganizationUnitAddUserDto
    {
        [Required]
        public List<Guid> UserIds { get; set; }
    }
}
