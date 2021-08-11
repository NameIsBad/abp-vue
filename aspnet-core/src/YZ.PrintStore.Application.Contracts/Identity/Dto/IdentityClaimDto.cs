using System;
using Volo.Abp.Application.Dtos;

namespace YZ.PrintStore.Identity
{
    public class IdentityClaimDto : EntityDto<Guid>
    {
        public string ClaimType { get; set; }

        public string ClaimValue { get; set; }
    }
}
