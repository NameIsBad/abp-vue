using Volo.Abp.Application.Dtos;

namespace YZ.PrintStore.Identity
{
    public class OrganizationUnitGetUnaddedRoleByPagedDto : PagedAndSortedResultRequestDto
    {

        public string Filter { get; set; }
    }
}
