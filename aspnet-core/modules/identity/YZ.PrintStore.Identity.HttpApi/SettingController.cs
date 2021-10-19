using EasyAbp.Abp.SettingUi;
using EasyAbp.Abp.SettingUi.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Identity;
using YZ.PrintStore.Identity.Settings;

namespace YZ.PrintStore.Identity
{
    [RemoteService(Name = IdentityRemoteServiceConsts.RemoteServiceName)]
    [Area("identity")]
    [ControllerName("settings")]
    [Authorize(IdentityPermissions.OrganizationUnits.Default)]
    [Route("api/identity/settings")]
    public class SettingController : AbpController
    {
        private readonly ISettingUiAppService _settingUiAppService;

        public SettingController(ISettingUiAppService settingUiAppService)
        {
            _settingUiAppService = settingUiAppService;
        }

        [HttpGet]
        public async Task<ListResultDto<SettingGroup>> GetAsync()
        {
            var ret = await _settingUiAppService.GroupSettingDefinitions();
            return new ListResultDto<SettingGroup>(ret);
        }

        [HttpPost]
        public async Task UpdateAsync(UpdateSettingInput input)
        {
            await _settingUiAppService.SetSettingValues(input.Values);
        }
    }
}