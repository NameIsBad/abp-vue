import type {
  GetIdentityRolesInput,
  IdentityRoleCreateDto,
  IdentityRoleDto,
  IdentityRoleUpdateDto,
} from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import type { ListResultDto, PagedResultDto } from '/@/utils/models/dtos';

export class IdentityRoleService {
  apiName = 'AbpIdentity';

  create = (input: IdentityRoleCreateDto, requestOptions?: RequestOptions) =>
    defHttp.request<IdentityRoleDto>(
      {
        method: 'POST',
        url: '/api/identity/roles',
        data: input,
      },
      requestOptions,
    );

  delete = (id: string, requestOptions?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/identity/roles/${id}`,
      },
      requestOptions,
    );

  get = (id: string, requestOptions?: RequestOptions) =>
    defHttp.request<IdentityRoleDto>(
      {
        method: 'GET',
        url: `/api/identity/roles/${id}`,
      },
      requestOptions,
    );

  getAllList = (requestOptions?: RequestOptions) =>
    defHttp.request<ListResultDto<IdentityRoleDto>>(
      {
        method: 'GET',
        url: '/api/identity/roles/all',
      },
      requestOptions,
    );

  getList = (input: GetIdentityRolesInput, requestOptions?: RequestOptions) =>
    defHttp.request<PagedResultDto<IdentityRoleDto>>(
      {
        method: 'GET',
        url: '/api/identity/roles',
        params: {
          filter: input.filter,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      requestOptions,
    );

  update = (id: string, input: IdentityRoleUpdateDto, requestOptions?: RequestOptions) =>
    defHttp.request<IdentityRoleDto>(
      {
        method: 'PUT',
        url: `/api/identity/roles/${id}`,
        data: input,
      },
      requestOptions,
    );
}
