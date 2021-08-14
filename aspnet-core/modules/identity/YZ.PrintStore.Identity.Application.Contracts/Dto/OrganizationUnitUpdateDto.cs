using Volo.Abp.ObjectExtending;

namespace YZ.PrintStore.Identity
{
    public class OrganizationUnitUpdateDto : ExtensibleObject
    {
        public string DisplayName { get; set; }
    }
}
