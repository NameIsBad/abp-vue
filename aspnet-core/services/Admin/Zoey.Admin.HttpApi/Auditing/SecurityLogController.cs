using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Zoey.Admin.Auditing.Security;
using Volo.Abp;
using Volo.Abp.Application.Dtos;

namespace Zoey.Admin.Auditing;

[RemoteService(Name = AuditingRemoteServiceConsts.RemoteServiceName)]
[ApiExplorerSettings(GroupName = AuditingRemoteServiceConsts.RemoteServiceName)]
[Area("auditing")]
[ControllerName("security-log")]
[Route("api/auditing/security-log")]
public class SecurityLogController : AdminController, ISecurityLogAppService
{
    protected ISecurityLogAppService SecurityLogAppService { get; }

    public SecurityLogController(ISecurityLogAppService securityLogAppService)
    {
        SecurityLogAppService = securityLogAppService;
    }

    [HttpDelete]
    [Route("{id}")]
    public virtual async Task DeleteAsync(Guid id)
    {
        await SecurityLogAppService.DeleteAsync(id);
    }

    [HttpGet]
    [Route("{id}")]
    public virtual async Task<SecurityLogDto> GetAsync(Guid id)
    {
        return await SecurityLogAppService.GetAsync(id);
    }

    [HttpGet]
    public virtual async Task<PagedResultDto<SecurityLogDto>> GetListAsync(SecurityLogGetByPagedDto input)
    {
        return await SecurityLogAppService.GetListAsync(input);
    }
}