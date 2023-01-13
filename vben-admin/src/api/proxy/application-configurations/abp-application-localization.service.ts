import type { ApplicationLocalizationDto, ApplicationLocalizationRequestDto } from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

export class AbpApplicationLocalizationService {
  apiName = 'abp';

  get = (input: ApplicationLocalizationRequestDto, requestOptions?: RequestOptions) =>
    defHttp.request<ApplicationLocalizationDto>(
      {
        method: 'GET',
        url: '/api/abp/application-localization',
        params: {
          cultureName: input.cultureName,
          onlyDynamics: input.onlyDynamics,
        },
      },
      requestOptions,
    );
}
