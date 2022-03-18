using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Zoey.Admin.Auditing.Logging;
using Volo.Abp;
using Volo.Abp.Application.Dtos;

namespace Zoey.Admin.Auditing;

[RemoteService(Name = AuditingRemoteServiceConsts.RemoteServiceName)]
[ApiExplorerSettings(GroupName = AuditingRemoteServiceConsts.RemoteServiceName)]
[Area("auditing")]
[ControllerName("audit-log")]
[Route("api/auditing/audit-log")]
public class AuditLogController : AdminController, IAuditLogAppService
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