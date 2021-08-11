using Volo.Abp.Application.Dtos;

namespace YZ.PrintStore.Identity
{
    public class OrganizationUnitGetUnaddedUserByPagedDto : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }
    }
}
