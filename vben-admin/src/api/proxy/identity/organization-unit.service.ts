import type {
  GetIdentityUsersInput,
  IdentityRoleDto,
  IdentityUserDto,
  OrganizationUnitAddRoleDto,
  OrganizationUnitAddUserDto,
  OrganizationUnitCreateDto,
  OrganizationUnitDto,
  OrganizationUnitGetByPagedDto,
  OrganizationUnitGetChildrenDto,
  OrganizationUnitGetUnaddedRoleByPagedDto,
  OrganizationUnitGetUnaddedUserByPagedDto,
  OrganizationUnitMoveDto,
  OrganizationUnitUpdateDto,
} from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import type {
  ListResultDto,
  PagedAndSortedResultRequestDto,
  PagedResultDto,
} from '/@/utils/models/dtos';

export class OrganizationUnitService {
  apiName = 'AbpIdentity';

  addRoles = (id: string, input: OrganizationUnitAddRoleDto, requestOptions?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'POST',
        url: `/api/identity/organization-units/${id}/roles`,
        data: input,
      },
      requestOptions,
    );

  addUsers = (id: string, input: OrganizationUnitAddUserDto, requestOptions?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'POST',
        url: `/api/identity/organization-units/${id}/users`,
        data: input,
      },
      requestOptions,
    );

  create = (input: OrganizationUnitCreateDto, requestOptions?: RequestOptions) =>
    defHttp.request<OrganizationUnitDto>(
      {
        method: 'POST',
        url: '/api/identity/organization-units',
        data: input,
      },
      requestOptions,
    );

  delete = (id: string, requestOptions?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/identity/organization-units/${id}`,
      },
      requestOptions,
    );

  findChildren = (input: OrganizationUnitGetChildrenDto, requestOptions?: RequestOptions) =>
    defHttp.request<ListResultDto<OrganizationUnitDto>>(
      {
        method: 'GET',
        url: '/api/identity/organization-units/find-children',
        params: {
          id: input.id,
          recursive: input.recursive,
        },
      },
      requestOptions,
    );

  get = (id: string, requestOptions?: RequestOptions) =>
    defHttp.request<OrganizationUnitDto>(
      {
        method: 'GET',
        url: `/api/identity/organization-units/${id}`,
      },
      requestOptions,
    );

  getAllList = (requestOptions?: RequestOptions) =>
    defHttp.request<ListResultDto<OrganizationUnitDto>>(
      {
        method: 'GET',
        url: '/api/identity/organization-units/all',
      },
      requestOptions,
    );

  getLastChildOrNull = (parentId: string, requestOptions?: RequestOptions) =>
    defHttp.request<OrganizationUnitDto>(
      {
        method: 'GET',
        url: '/api/identity/organization-units/last-children',
        params: {
          parentId,
        },
      },
      requestOptions,
    );

  getList = (input: OrganizationUnitGetByPagedDto, requestOptions?: RequestOptions) =>
    defHttp.request<PagedResultDto<OrganizationUnitDto>>(
      {
        method: 'GET',
        url: '/api/identity/organization-units',
        params: {
          filter: input.filter,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      requestOptions,
    );

  getRoleNames = (id: string, requestOptions?: RequestOptions) =>
    defHttp.request<ListResultDto<string>>(
      {
        method: 'GET',
        url: `/api/identity/organization-units/${id}/role-names`,
      },
      requestOptions,
    );

  getRoles = (id: string, input: PagedAndSortedResultRequestDto, requestOptions?: RequestOptions) =>
    defHttp.request<PagedResultDto<IdentityRoleDto>>(
      {
        method: 'GET',
        url: `/api/identity/organization-units/${id}/roles`,
        params: {
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      requestOptions,
    );

  getRoot = (requestOptions?: RequestOptions) =>
    defHttp.request<ListResultDto<OrganizationUnitDto>>(
      {
        method: 'GET',
        url: '/api/identity/organization-units/root-node',
      },
      requestOptions,
    );

  getUnaddedRoles = (
    id: string,
    input: OrganizationUnitGetUnaddedRoleByPagedDto,
    requestOptions?: RequestOptions,
  ) =>
    defHttp.request<PagedResultDto<IdentityRoleDto>>(
      {
        method: 'GET',
        url: `/api/identity/organization-units/${id}/unadded-roles`,
        params: {
          filter: input.filter,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      requestOptions,
    );

  getUnaddedUsers = (
    id: string,
    input: OrganizationUnitGetUnaddedUserByPagedDto,
    requestOptions?: RequestOptions,
  ) =>
    defHttp.request<PagedResultDto<IdentityUserDto>>(
      {
        method: 'GET',
        url: `/api/identity/organization-units/${id}/unadded-users`,
        params: {
          filter: input.filter,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      requestOptions,
    );

  getUsers = (id: string, input: GetIdentityUsersInput, requestOptions?: RequestOptions) =>
    defHttp.request<PagedResultDto<IdentityUserDto>>(
      {
        method: 'GET',
        url: `/api/identity/organization-units/${id}/users`,
        params: {
          filter: input.filter,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      requestOptions,
    );

  move = (id: string, input: OrganizationUnitMoveDto, requestOptions?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'PUT',
        url: `/api/identity/organization-units/${id}/move`,
        data: input,
      },
      requestOptions,
    );

  removeRoles = (roleId: string, ouId: string, requestOptions?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/identity/organization-units/${ouId}/roles/${roleId}`,
      },
      requestOptions,
    );

  removeUsers = (userId: string, ouId: string, requestOptions?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/identity/organization-units/${ouId}/users/${userId}`,
      },
      requestOptions,
    );

  update = (id: string, input: OrganizationUnitUpdateDto, requestOptions?: RequestOptions) =>
    defHttp.request<OrganizationUnitDto>(
      {
        method: 'PUT',
        url: `/api/identity/organization-units/${id}`,
        data: input,
      },
      requestOptions,
    );
}
