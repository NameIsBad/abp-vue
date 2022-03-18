using Volo.Abp.Application.Dtos;

namespace Zoey.Admin.Identity;

public class IdentityClaimTypeGetByPagedDto : PagedAndSortedResultRequestDto
{
    public string Filter { get; set; }
}