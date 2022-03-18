using Volo.Abp.Application.Dtos;

namespace Zoey.Admin.Identity;

public class OrganizationUnitGetByPagedDto : PagedAndSortedResultRequestDto
{
    public string Filter { get; set; }
}