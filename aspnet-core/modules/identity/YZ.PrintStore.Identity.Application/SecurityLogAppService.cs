using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Features;
using Volo.Abp.Identity;
using YZ.PrintStore.Identity.Features;
using YZ.PrintStore.Identity.Security;

namespace YZ.PrintStore.Identity.Auditing.Security
{
    [Authorize(IdentityPermissions.SecurityLog.Default)]
    [RequiresFeature(AuditingFeatureNames.Logging.SecurityLog)]
    public class SecurityLogAppService : IdentityAppServiceBase, ISecurityLogAppService
    {
        protected IIdentitySecurityLogRepository SecurityLogRepository { get; }
        public SecurityLogAppService(IIdentitySecurityLogRepository securityLogRepository)
        {
            SecurityLogRepository = securityLogRepository;
        }

        public virtual async Task<SecurityLogDto> GetAsync(Guid id)
        {
            var securityLog = await SecurityLogRepository.GetAsync(id, includeDetails: true);

            return ObjectMapper.Map<IdentitySecurityLog, SecurityLogDto>(securityLog);
        }

        public virtual async Task<PagedResultDto<SecurityLogDto>> GetListAsync(SecurityLogGetByPagedDto input)
        {
            var securityLogCount = await SecurityLogRepository
                .GetCountAsync(input.StartTime, input.EndTime,
                    input.ApplicationName, input.Identity, input.ActionName,
                    input.UserId, input.UserName, input.ClientId, input.CorrelationId
                );

            var securityLogs = await SecurityLogRepository
                .GetListAsync(input.Sorting, input.MaxResultCount, input.SkipCount,
                    input.StartTime, input.EndTime,
                    input.ApplicationName, input.Identity, input.ActionName,
                    input.UserId, input.UserName, input.ClientId, input.CorrelationId,
                    includeDetails: false
                );

            return new PagedResultDto<SecurityLogDto>(securityLogCount,
                ObjectMapper.Map<List<IdentitySecurityLog>, List<SecurityLogDto>>(securityLogs));
        }

        [Authorize(IdentityPermissions.SecurityLog.Delete)]
        public virtual async Task DeleteAsync(Guid id)
        {
            var securityLog = await SecurityLogRepository.GetAsync(id);
            await SecurityLogRepository.DeleteAsync(securityLog);

            await CurrentUnitOfWork.SaveChangesAsync();
        }
    }
}
