using AutoMapper;
using Volo.Abp.Identity;

namespace YZ.PrintStore.Identity
{
    public class IdentityApplicationModuleAutoMapperProfile : Profile
    {
        public IdentityApplicationModuleAutoMapperProfile()
        {
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
        }
    }
}
