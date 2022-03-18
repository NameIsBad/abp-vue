using System;
using System.Threading.Tasks;
using Zoey.Identity;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Zoey.Admin.Identity;

public interface IIdentityClaimTypeAppService :
    ICrudAppService<
        IdentityClaimTypeDto,
        Guid,
        IdentityClaimTypeGetByPagedDto,
        IdentityClaimTypeCreateDto,
        IdentityClaimTypeUpdateDto>
{
    Task<ListResultDto<IdentityClaimTypeDto>> GetAllListAsync();
}