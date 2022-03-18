import type {
  GetTenantsInput,
  TenantCreateDto,
  TenantDto,
  TenantUpdateDto,
} from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import type { PagedResultDto } from '/@/utils/models/dtos';

export class TenantService {
  apiName = 'AbpTenantManagement';

  create = (input: TenantCreateDto, options?: RequestOptions) =>
    defHttp.request<TenantDto>(
      {
        method: 'POST',
        url: '/api/multi-tenancy/tenants',
        data: input,
      },
      options,
    );

  deleteById = (id: string, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/multi-tenancy/tenants/${id}`,
      },
      options,
    );

  deleteDefaultConnectionString = (id: string, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/multi-tenancy/tenants/${id}/default-connection-string`,
      },
      options,
    );

  get = (id: string, options?: RequestOptions) =>
    defHttp.request<TenantDto>(
      {
        method: 'GET',
        url: `/api/multi-tenancy/tenants/${id}`,
      },
      options,
    );

  getDefaultConnectionString = (id: string, options?: RequestOptions) =>
    defHttp.request<string>(
      {
        method: 'GET',
        responseType: 'text',
        url: `/api/multi-tenancy/tenants/${id}/default-connection-string`,
      },
      options,
    );

  getList = (input: GetTenantsInput, options?: RequestOptions) =>
    defHttp.request<PagedResultDto<TenantDto>>(
      {
        method: 'GET',
        url: '/api/multi-tenancy/tenants',
        params: {
          filter: input.filter,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      options,
    );

  update = (id: string, input: TenantUpdateDto, options?: RequestOptions) =>
    defHttp.request<TenantDto>(
      {
        method: 'PUT',
        url: `/api/multi-tenancy/tenants/${id}`,
        data: input,
      },
      options,
    );

  updateDefaultConnectionString = (id: string, defaultConnectionString: string, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'PUT',
        url: `/api/multi-tenancy/tenants/${id}/default-connection-string`,
        params: {
          defaultConnectionString,
        },
      },
      options,
    );
}
