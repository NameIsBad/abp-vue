import type { ApplicationConfigurationDto, ApplicationConfigurationRequestOptions } from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

export class AbpApplicationConfigurationService {
  apiName = 'abp';

  get = (options: ApplicationConfigurationRequestOptions, requestOptions?: RequestOptions) =>
    defHttp.request<ApplicationConfigurationDto>(
      {
        method: 'GET',
        url: '/api/abp/application-configuration',
        params: {
          includeLocalizationResources: options.includeLocalizationResources,
        },
      },
      requestOptions,
    );
}
