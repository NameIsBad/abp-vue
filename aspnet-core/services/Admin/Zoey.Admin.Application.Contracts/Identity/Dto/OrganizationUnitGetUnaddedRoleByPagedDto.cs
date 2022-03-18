using Volo.Abp.Application.Dtos;

namespace Zoey.Admin.Identity;

public class OrganizationUnitGetUnaddedRoleByPagedDto : PagedAndSortedResultRequestDto
{

    public string Filter { get; set; }
}