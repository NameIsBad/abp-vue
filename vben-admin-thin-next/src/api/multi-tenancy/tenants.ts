import { defAbpHttp } from '/@/utils/http/abp';
import {
  FindTenantResult,
  TenantCreateOrEdit,
  TenantGetByPaged,
  TenantPageResult,
  TenantConnectionString,
} from './models/tenantModel';

import { format } from '/@/utils/strings';

enum Api {
  Tenants = '/api/multi-tenancy/tenants',
  TenantsById = '/api/multi-tenancy/tenants/{id}',
  ConnectString = '/api/multi-tenancy/tenants/{id}/default-connection-string',
}

export const create = (input: TenantCreateOrEdit) => {
  return defAbpHttp.post({
    url: Api.Tenants,
    data: input,
  });
};

export const deleteById = (id: string) => {
  return defAbpHttp.delete({
    url: format(Api.TenantsById, { id: id }),
  });
};

export const update = (id: string, input: TenantCreateOrEdit) => {
  return defAbpHttp.put({
    url: format(Api.TenantsById, { id: id }),
    data: {
      name: input.name,
    },
  });
};

export const findTenantByName = (name: string) => {
  return defAbpHttp.request<FindTenantResult>({
    service: 'abp',
    controller: 'AbpTenant',
    action: 'FindTenantByNameAsync',
    params: { name: name },
  });
};

export const findTenantById = (id: string) => {
  return defAbpHttp.request<FindTenantResult>({
    service: 'abp',
    controller: 'AbpTenant',
    action: 'FindTenantByIdAsync',
    params: { id: id },
  });
};

export const getList = (input: TenantGetByPaged) => {
  return defAbpHttp.get<TenantPageResult>({
    url: Api.Tenants,
    params: input,
  });
};

/**
 * 连接字符串
 */

export const deleteConnectStringById = (input: TenantConnectionString) => {
  return defAbpHttp.delete({
    url: format(Api.ConnectString, { id: input.id }),
  });
};

export const updateConnectString = (input: TenantConnectionString) => {
  return defAbpHttp.put(
    {
      url: format(Api.ConnectString, { id: input.id }),
      params: {
        defaultConnectionString: input.defaultConnectionString,
      },
    },
    {
      joinParamsToUrl: true,
    },
  );
};

export const getConnectStringById = (id: string) => {
  return defAbpHttp.get<string>({
    url: format(Api.ConnectString, { id: id }),
  });
};
