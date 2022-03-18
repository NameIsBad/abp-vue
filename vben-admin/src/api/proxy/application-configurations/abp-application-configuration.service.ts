import type { ApplicationConfigurationDto } from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

export class AbpApplicationConfigurationService {
  apiName = 'abp';

  get = (options?: RequestOptions) =>
    defHttp.request<ApplicationConfigurationDto>(
      {
        method: 'GET',
        url: '/api/abp/application-configuration',
      },
      options,
    );
}
