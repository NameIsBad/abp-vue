import type { EmailSettingsDto, SendTestEmailInput, UpdateEmailSettingsDto } from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

export class EmailSettingsService {
  apiName = 'SettingManagement';

  get = (requestOptions?: RequestOptions) =>
    defHttp.request<EmailSettingsDto>(
      {
        method: 'GET',
        url: '/api/setting-management/emailing',
      },
      requestOptions,
    );

  sendTestEmail = (input: SendTestEmailInput, requestOptions?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'POST',
        url: '/api/setting-management/emailing/send-test-email',
        data: input,
      },
      requestOptions,
    );

  update = (input: UpdateEmailSettingsDto, requestOptions?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'POST',
        url: '/api/setting-management/emailing',
        data: input,
      },
      requestOptions,
    );
}
