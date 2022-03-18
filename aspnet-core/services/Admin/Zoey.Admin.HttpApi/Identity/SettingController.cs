using EasyAbp.Abp.SettingUi;
using EasyAbp.Abp.SettingUi.Dto;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace Zoey.Admin.Identity;

[RemoteService(Name = IdentityRemoteServiceConsts.RemoteServiceName)]
[ApiExplorerSettings(GroupName = IdentityRemoteServiceConsts.ModuleName)]
[Area(IdentityRemoteServiceConsts.ModuleName)]
[ControllerName("settings")]
[Route("api/identity/settings")]
public class SettingController : AdminController
{
    private readonly ISettingUiAppService _settingUiAppService;

    public SettingController(ISettingUiAppService settingUiAppService)
    {
        _settingUiAppService = settingUiAppService;
    }

    [HttpGet]
    public async Task<ListResultDto<SettingGroup>> GetAsync()
    {
        var ret = await _settingUiAppService.GroupSettingDefinitionsAsync();
        return new ListResultDto<SettingGroup>(ret);
    }

    [HttpPost]
    public async Task UpdateAsync(UpdateSettingInput input)
    {
        await _settingUiAppService.SetSettingValuesAsync(input.Values);
    }
}