using Volo.Abp.Application.Dtos;

namespace YZ.PrintStore.Identity
{
    public class OrganizationUnitGetByPagedDto : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }
    }
}
