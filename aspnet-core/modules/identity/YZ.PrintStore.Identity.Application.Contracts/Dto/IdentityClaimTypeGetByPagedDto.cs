using Volo.Abp.Application.Dtos;

namespace YZ.PrintStore.Identity
{
    public class IdentityClaimTypeGetByPagedDto : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }
    }
}
