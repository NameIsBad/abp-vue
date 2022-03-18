import type {
  ChangePasswordDto,
  GetIdentityUsersInput,
  IdentityClaimDto,
  IdentityRoleDto,
  IdentityUserClaimCreateDto,
  IdentityUserClaimDeleteDto,
  IdentityUserClaimUpdateDto,
  IdentityUserCreateDto,
  IdentityUserDto,
  IdentityUserOrganizationUnitUpdateDto,
  IdentityUserUpdateDto,
  IdentityUserUpdateRolesDto,
  OrganizationUnitDto,
} from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import type { ListResultDto, PagedResultDto } from '/@/utils/models/dtos';

export class IdentityUserService {
  apiName = 'AbpIdentity';

  addClaim = (id: string, input: IdentityUserClaimCreateDto, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'POST',
        url: `/api/identity/users/${id}/claims`,
        data: input,
      },
      options,
    );

  changePassword = (id: string, input: ChangePasswordDto, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'PUT',
        url: '/api/identity/users/change-password',
        params: {
          id,
        },
        data: input,
      },
      options,
    );

  create = (input: IdentityUserCreateDto, options?: RequestOptions) =>
    defHttp.request<IdentityUserDto>(
      {
        method: 'POST',
        url: '/api/identity/users',
        data: input,
      },
      options,
    );

  deleteById = (id: string, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/identity/users/${id}`,
      },
      options,
    );

  deleteClaim = (id: string, input: IdentityUserClaimDeleteDto, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/identity/users/${id}/claims`,
        params: {
          claimType: input.claimType,
          claimValue: input.claimValue,
        },
      },
      options,
    );

  findByEmail = (email: string, options?: RequestOptions) =>
    defHttp.request<IdentityUserDto>(
      {
        method: 'GET',
        url: `/api/identity/users/by-email/${email}`,
      },
      options,
    );

  findByUsername = (userName: string, options?: RequestOptions) =>
    defHttp.request<IdentityUserDto>(
      {
        method: 'GET',
        url: `/api/identity/users/by-username/${userName}`,
      },
      options,
    );

  get = (id: string, options?: RequestOptions) =>
    defHttp.request<IdentityUserDto>(
      {
        method: 'GET',
        url: `/api/identity/users/${id}`,
      },
      options,
    );

  getAssignableRoles = (options?: RequestOptions) =>
    defHttp.request<ListResultDto<IdentityRoleDto>>(
      {
        method: 'GET',
        url: '/api/identity/users/assignable-roles',
      },
      options,
    );

  getClaims = (id: string, options?: RequestOptions) =>
    defHttp.request<ListResultDto<IdentityClaimDto>>(
      {
        method: 'GET',
        url: `/api/identity/users/${id}/claims`,
      },
      options,
    );

  getList = (input: GetIdentityUsersInput, options?: RequestOptions) =>
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
      options,
    );

  getOrganizationUnits = (id: string, options?: RequestOptions) =>
    defHttp.request<ListResultDto<OrganizationUnitDto>>(
      {
        method: 'GET',
        url: `/api/identity/users/${id}/organization-units`,
      },
      options,
    );

  getRoles = (id: string, options?: RequestOptions) =>
    defHttp.request<ListResultDto<IdentityRoleDto>>(
      {
        method: 'GET',
        url: `/api/identity/users/${id}/roles`,
      },
      options,
    );

  lock = (id: string, seconds: number, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'PUT',
        url: `/api/identity/users/${id}/lock/${seconds}`,
      },
      options,
    );

  removeOrganizationUnits = (id: string, ouId: string, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/identity/users/${id}/organization-units/${ouId}`,
      },
      options,
    );

  setOrganizationUnits = (id: string, input: IdentityUserOrganizationUnitUpdateDto, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'PUT',
        url: `/api/identity/users/${id}/organization-units`,
        data: input,
      },
      options,
    );

  unLock = (id: string, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'PUT',
        url: `/api/identity/users/${id}/unlock`,
      },
      options,
    );

  update = (id: string, input: IdentityUserUpdateDto, options?: RequestOptions) =>
    defHttp.request<IdentityUserDto>(
      {
        method: 'PUT',
        url: `/api/identity/users/${id}`,
        data: input,
      },
      options,
    );

  updateClaim = (id: string, input: IdentityUserClaimUpdateDto, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'PUT',
        url: `/api/identity/users/${id}/claims`,
        data: input,
      },
      options,
    );

  updateRoles = (id: string, input: IdentityUserUpdateRolesDto, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'PUT',
        url: `/api/identity/users/${id}/roles`,
        data: input,
      },
      options,
    );
}
