import type { GetFeatureListResultDto, UpdateFeaturesDto } from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

export class FeaturesService {
  apiName = 'AbpFeatureManagement';

  get = (providerName: string, providerKey: string, options?: RequestOptions) =>
    defHttp.request<GetFeatureListResultDto>(
      {
        method: 'GET',
        url: '/api/feature-management/features',
        params: {
          providerName,
          providerKey,
        },
      },
      options,
    );

  update = (
    providerName: string,
    providerKey: string,
    input: UpdateFeaturesDto,
    options?: RequestOptions,
  ) =>
    defHttp.request<void>(
      {
        method: 'PUT',
        url: '/api/feature-management/features',
        params: {
          providerName,
          providerKey,
        },
        data: input,
      },
      options,
    );
}
