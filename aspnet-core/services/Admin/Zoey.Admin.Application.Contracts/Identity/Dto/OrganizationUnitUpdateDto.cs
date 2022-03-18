using Volo.Abp.ObjectExtending;

namespace Zoey.Admin.Identity;

public class OrganizationUnitUpdateDto : ExtensibleObject
{
    public string DisplayName { get; set; }
}