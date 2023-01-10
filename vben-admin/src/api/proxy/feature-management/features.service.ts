import type { GetFeatureListResultDto, UpdateFeaturesDto } from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

export class FeaturesService {
  apiName = 'AbpFeatureManagement';

  delete = (providerName: string, providerKey: string, requestOptions?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: '/api/feature-management/features',
        params: {
          providerName,
          providerKey,
        },
      },
      requestOptions,
    );

  get = (providerName: string, providerKey: string, requestOptions?: RequestOptions) =>
    defHttp.request<GetFeatureListResultDto>(
      {
        method: 'GET',
        url: '/api/feature-management/features',
        params: {
          providerName,
          providerKey,
        },
      },
      requestOptions,
    );

  update = (
    providerName: string,
    providerKey: string,
    input: UpdateFeaturesDto,
    requestOptions?: RequestOptions,
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
      requestOptions,
    );
}
