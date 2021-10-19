using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AspNetCore.Mvc;
using YZ.PrintStore.AdministrationService.Auditing.Permissions;

namespace YZ.PrintStore.AdministrationService.Auditing.Logging
{
    [RemoteService(Name = AuditingRemoteServiceConsts.RemoteServiceName)]
    [Area("auditing")]
    [ControllerName("audit-log")]
    [Authorize(AuditingPermissionNames.AuditLog.Default)]
    [Route("api/auditing/audit-log")]
    public class AuditLogController : AbpController, IAuditLogAppService
    {
        protected IAuditLogAppService AuditLogAppService { get; }

        public AuditLogController(IAuditLogAppService auditLogAppService)
        {
            AuditLogAppService = auditLogAppService;
        }

        [HttpDelete]
        [Route("{id}")]
        public virtual async Task DeleteAsync(Guid id)
        {
            await AuditLogAppService.DeleteAsync(id);
        }

        [HttpGet]
        [Route("{id}")]
        public virtual async Task<AuditLogDto> GetAsync(Guid id)
        {
            return await AuditLogAppService.GetAsync(id);
        }

        [HttpGet]
        public virtual async Task<PagedResultDto<AuditLogDto>> GetListAsync(AuditLogGetByPagedDto input)
        {
            return await AuditLogAppService.GetListAsync(input);
        }
    }
}
