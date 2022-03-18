import type { EmailSettingsDto, UpdateEmailSettingsDto } from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

export class EmailSettingsService {
  apiName = 'SettingManagement';

  get = (options?: RequestOptions) =>
    defHttp.request<EmailSettingsDto>(
      {
        method: 'GET',
        url: '/api/setting-management/emailing',
      },
      options,
    );

  update = (input: UpdateEmailSettingsDto, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'POST',
        url: '/api/setting-management/emailing',
        data: input,
      },
      options,
    );
}
