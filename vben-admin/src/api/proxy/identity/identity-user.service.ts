import type {
  GetIdentityUsersInput,
  IdentityRoleDto,
  IdentityUserCreateDto,
  IdentityUserDto,
  IdentityUserUpdateDto,
  IdentityUserUpdateRolesDto,
} from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import type { ListResultDto, PagedResultDto } from '/@/utils/models/dtos';

export class IdentityUserService {
  apiName = 'AbpIdentity';

  create = (input: IdentityUserCreateDto, requestOptions?: RequestOptions) =>
    defHttp.request<IdentityUserDto>(
      {
        method: 'POST',
        url: '/api/identity/users',
        data: input,
      },
      requestOptions,
    );

  delete = (id: string, requestOptions?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/identity/users/${id}`,
      },
      requestOptions,
    );

  findByEmail = (email: string, requestOptions?: RequestOptions) =>
    defHttp.request<IdentityUserDto>(
      {
        method: 'GET',
        url: `/api/identity/users/by-email/${email}`,
      },
      requestOptions,
    );

  findByUsername = (userName: string, requestOptions?: RequestOptions) =>
    defHttp.request<IdentityUserDto>(
      {
        method: 'GET',
        url: `/api/identity/users/by-username/${userName}`,
      },
      requestOptions,
    );

  get = (id: string, requestOptions?: RequestOptions) =>
    defHttp.request<IdentityUserDto>(
      {
        method: 'GET',
        url: `/api/identity/users/${id}`,
      },
      requestOptions,
    );

  getAssignableRoles = (requestOptions?: RequestOptions) =>
    defHttp.request<ListResultDto<IdentityRoleDto>>(
      {
        method: 'GET',
        url: '/api/identity/users/assignable-roles',
      },
      requestOptions,
    );

  getList = (input: GetIdentityUsersInput, requestOptions?: RequestOptions) =>
    defHttp.request<PagedResultDto<IdentityUserDto>>(
      {
        method: 'GET',
        url: '/api/identity/users',
        params: {
          filter: input.filter,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      requestOptions,
    );

  getRoles = (id: string, requestOptions?: RequestOptions) =>
    defHttp.request<ListResultDto<IdentityRoleDto>>(
      {
        method: 'GET',
        url: `/api/identity/users/${id}/roles`,
      },
      requestOptions,
    );

  update = (id: string, input: IdentityUserUpdateDto, requestOptions?: RequestOptions) =>
    defHttp.request<IdentityUserDto>(
      {
        method: 'PUT',
        url: `/api/identity/users/${id}`,
        data: input,
      },
      requestOptions,
    );

  updateRoles = (id: string, input: IdentityUserUpdateRolesDto, requestOptions?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'PUT',
        url: `/api/identity/users/${id}/roles`,
        data: input,
      },
      requestOptions,
    );
}
