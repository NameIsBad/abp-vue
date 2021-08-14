using AutoMapper;
using Volo.Abp.Identity;
using YZ.PrintStore.Identity.Security;

namespace YZ.PrintStore.Identity
{
    public class IdentityApplicationAutoMapperProfile : Profile
    {
        public IdentityApplicationAutoMapperProfile()
        {
            /* You can configure your AutoMapper mapping configuration here.
             * Alternatively, you can split your mapping configurations
             * into multiple profile classes for a better organization. */
            CreateMap<IdentityClaimType, IdentityClaimTypeDto>()
                .MapExtraProperties();
            CreateMap<IdentityUserClaim, IdentityClaimDto>();
            CreateMap<IdentityRoleClaim, IdentityClaimDto>();

            CreateMap<IdentityUser, IdentityUserDto>()
                .MapExtraProperties();

            CreateMap<IdentityRole, IdentityRoleDto>()
                .MapExtraProperties();

            CreateMap<OrganizationUnit, OrganizationUnitDto>()
                .MapExtraProperties();

            CreateMap<IdentitySecurityLog, SecurityLogDto>();
        }
    }
}