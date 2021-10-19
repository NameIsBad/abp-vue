import { defAbpHttp } from '/@/utils/http/abp';
import { SettingGroup, UpdateSettingInput } from './model/settingModel';
import { ListResultDto } from '/@/api/model/baseModel';

enum Api {
  GetAllSettings = '/api/identity/settings',
  UpdateSettings = '/api/identity/settings',
}

export const getAllSettingsAsync = () => {
  return defAbpHttp.get<ListResultDto<SettingGroup>>({
    url: Api.GetAllSettings,
  });
};

export const updateSettingsAsync = (input: UpdateSettingInput) => {
  return defAbpHttp.post({
    url: Api.UpdateSettings,
    data: input,
  });
};
