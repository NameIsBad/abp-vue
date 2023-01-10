import type { FindTenantResultDto } from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

export class AbpTenantService {
  apiName = 'abp';

  findTenantById = (id: string, requestOptions?: RequestOptions) =>
    defHttp.request<FindTenantResultDto>(
      {
        method: 'GET',
        url: `/api/abp/multi-tenancy/tenants/by-id/${id}`,
      },
      requestOptions,
    );

  findTenantByName = (name: string, requestOptions?: RequestOptions) =>
    defHttp.request<FindTenantResultDto>(
      {
        method: 'GET',
        url: `/api/abp/multi-tenancy/tenants/by-name/${name}`,
      },
      requestOptions,
    );
}
