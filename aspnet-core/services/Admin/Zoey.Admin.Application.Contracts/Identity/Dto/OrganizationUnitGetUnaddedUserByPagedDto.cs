using Volo.Abp.Application.Dtos;

namespace Zoey.Admin.Identity;

public class OrganizationUnitGetUnaddedUserByPagedDto : PagedAndSortedResultRequestDto
{
    public string Filter { get; set; }
}