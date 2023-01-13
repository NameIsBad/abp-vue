import type { GetTenantsInput, TenantCreateDto, TenantDto, TenantUpdateDto } from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import type { PagedResultDto } from '/@/utils/models/dtos';

export class TenantService {
  apiName = 'AbpTenantManagement';

  create = (input: TenantCreateDto, requestOptions?: RequestOptions) =>
    defHttp.request<TenantDto>(
      {
        method: 'POST',
        url: '/api/multi-tenancy/tenants',
        data: input,
      },
      requestOptions,
    );

  delete = (id: string, requestOptions?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/multi-tenancy/tenants/${id}`,
      },
      requestOptions,
    );

  deleteDefaultConnectionString = (id: string, requestOptions?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/multi-tenancy/tenants/${id}/default-connection-string`,
      },
      requestOptions,
    );

  get = (id: string, requestOptions?: RequestOptions) =>
    defHttp.request<TenantDto>(
      {
        method: 'GET',
        url: `/api/multi-tenancy/tenants/${id}`,
      },
      requestOptions,
    );

  getDefaultConnectionString = (id: string, requestOptions?: RequestOptions) =>
    defHttp.request<string>(
      {
        method: 'GET',
        responseType: 'text',
        url: `/api/multi-tenancy/tenants/${id}/default-connection-string`,
      },
      requestOptions,
    );

  getList = (input: GetTenantsInput, requestOptions?: RequestOptions) =>
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
      requestOptions,
    );

  update = (id: string, input: TenantUpdateDto, requestOptions?: RequestOptions) =>
    defHttp.request<TenantDto>(
      {
        method: 'PUT',
        url: `/api/multi-tenancy/tenants/${id}`,
        data: input,
      },
      requestOptions,
    );

  updateDefaultConnectionString = (
    id: string,
    defaultConnectionString: string,
    requestOptions?: RequestOptions,
  ) =>
    defHttp.request<void>(
      {
        method: 'PUT',
        url: `/api/multi-tenancy/tenants/${id}/default-connection-string`,
        params: {
          defaultConnectionString,
        },
      },
      requestOptions,
    );
}
