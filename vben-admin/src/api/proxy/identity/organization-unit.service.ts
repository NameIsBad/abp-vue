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

  addRoles = (id: string, input: OrganizationUnitAddRoleDto, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'POST',
        url: `/api/identity/organization-units/${id}/roles`,
        data: input,
      },
      options,
    );

  addUsers = (id: string, input: OrganizationUnitAddUserDto, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'POST',
        url: `/api/identity/organization-units/${id}/users`,
        data: input,
      },
      options,
    );

  create = (input: OrganizationUnitCreateDto, options?: RequestOptions) =>
    defHttp.request<OrganizationUnitDto>(
      {
        method: 'POST',
        url: '/api/identity/organization-units',
        data: input,
      },
      options,
    );

  deleteById = (id: string, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/identity/organization-units/${id}`,
      },
      options,
    );

  findChildren = (input: OrganizationUnitGetChildrenDto, options?: RequestOptions) =>
    defHttp.request<ListResultDto<OrganizationUnitDto>>(
      {
        method: 'GET',
        url: '/api/identity/organization-units/find-children',
        params: {
          id: input.id,
          recursive: input.recursive,
        },
      },
      options,
    );

  get = (id: string, options?: RequestOptions) =>
    defHttp.request<OrganizationUnitDto>(
      {
        method: 'GET',
        url: `/api/identity/organization-units/${id}`,
      },
      options,
    );

  getAllList = (options?: RequestOptions) =>
    defHttp.request<ListResultDto<OrganizationUnitDto>>(
      {
        method: 'GET',
        url: '/api/identity/organization-units/all',
      },
      options,
    );

  getLastChildOrNull = (parentId: string, options?: RequestOptions) =>
    defHttp.request<OrganizationUnitDto>(
      {
        method: 'GET',
        url: '/api/identity/organization-units/last-children',
        params: {
          parentId,
        },
      },
      options,
    );

  getList = (input: OrganizationUnitGetByPagedDto, options?: RequestOptions) =>
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
      options,
    );

  getRoleNames = (id: string, options?: RequestOptions) =>
    defHttp.request<ListResultDto<string>>(
      {
        method: 'GET',
        url: `/api/identity/organization-units/${id}/role-names`,
      },
      options,
    );

  getRoles = (id: string, input: PagedAndSortedResultRequestDto, options?: RequestOptions) =>
    defHttp.request<PagedResultDto<IdentityRoleDto>>(
      {
        method: 'GET',
        url: `/api/identity/organization-units/${id}/roles`,
        params: {
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
          sorting: input.sorting,
        },
      },
      options,
    );

  getRoot = (options?: RequestOptions) =>
    defHttp.request<ListResultDto<OrganizationUnitDto>>(
      {
        method: 'GET',
        url: '/api/identity/organization-units/root-node',
      },
      options,
    );

  getUnaddedRoles = (
    id: string,
    input: OrganizationUnitGetUnaddedRoleByPagedDto,
    options?: RequestOptions,
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
      options,
    );

  getUnaddedUsers = (
    id: string,
    input: OrganizationUnitGetUnaddedUserByPagedDto,
    options?: RequestOptions,
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
      options,
    );

  getUsers = (id: string, input: GetIdentityUsersInput, options?: RequestOptions) =>
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
      options,
    );

  move = (id: string, input: OrganizationUnitMoveDto, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'PUT',
        url: `/api/identity/organization-units/${id}/move`,
        data: input,
      },
      options,
    );

  removeRoles = (roleId: string, ouId: string, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/identity/organization-units/${ouId}/roles/${roleId}`,
      },
      options,
    );

  removeUsers = (userId: string, ouId: string, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/identity/organization-units/${ouId}/users/${userId}`,
      },
      options,
    );

  update = (id: string, input: OrganizationUnitUpdateDto, options?: RequestOptions) =>
    defHttp.request<OrganizationUnitDto>(
      {
        method: 'PUT',
        url: `/api/identity/organization-units/${id}`,
        data: input,
      },
      options,
    );
}
