import type {
  GetIdentityRolesInput,
  IdentityClaimDto,
  IdentityRoleAddOrRemoveOrganizationUnitDto,
  IdentityRoleClaimCreateDto,
  IdentityRoleClaimDeleteDto,
  IdentityRoleClaimUpdateDto,
  IdentityRoleCreateDto,
  IdentityRoleDto,
  IdentityRoleUpdateDto,
  OrganizationUnitDto,
} from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import type { ListResultDto, PagedResultDto } from '/@/utils/models/dtos';

export class IdentityRoleService {
  apiName = 'AbpIdentity';

  addClaim = (id: string, input: IdentityRoleClaimCreateDto, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'POST',
        url: `/api/identity/roles/${id}/claims`,
        data: input,
      },
      options,
    );

  create = (input: IdentityRoleCreateDto, options?: RequestOptions) =>
    defHttp.request<IdentityRoleDto>(
      {
        method: 'POST',
        url: '/api/identity/roles',
        data: input,
      },
      options,
    );

  deleteById = (id: string, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/identity/roles/${id}`,
      },
      options,
    );

  deleteClaim = (id: string, input: IdentityRoleClaimDeleteDto, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/identity/roles/${id}/claims`,
        params: {
          claimType: input.claimType,
          claimValue: input.claimValue,
        },
      },
      options,
    );

  get = (id: string, options?: RequestOptions) =>
    defHttp.request<IdentityRoleDto>(
      {
        method: 'GET',
        url: `/api/identity/roles/${id}`,
      },
      options,
    );

  getAllList = (options?: RequestOptions) =>
    defHttp.request<ListResultDto<IdentityRoleDto>>(
      {
        method: 'GET',
        url: '/api/identity/roles/all',
      },
      options,
    );

  getClaims = (id: string, options?: RequestOptions) =>
    defHttp.request<ListResultDto<IdentityClaimDto>>(
      {
        method: 'GET',
        url: `/api/identity/roles/${id}/claims`,
      },
      options,
    );

  getList = (input: GetIdentityRolesInput, options?: RequestOptions) =>
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
      options,
    );

  getOrganizationUnits = (id: string, options?: RequestOptions) =>
    defHttp.request<ListResultDto<OrganizationUnitDto>>(
      {
        method: 'GET',
        url: `/api/identity/roles/${id}/organization-units`,
      },
      options,
    );

  removeOrganizationUnits = (id: string, ouId: string, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/identity/roles/${id}/organization-units/${ouId}`,
      },
      options,
    );

  setOrganizationUnits = (
    id: string,
    input: IdentityRoleAddOrRemoveOrganizationUnitDto,
    options?: RequestOptions,
  ) =>
    defHttp.request<void>(
      {
        method: 'PUT',
        url: `/api/identity/roles/${id}/organization-units`,
        data: input,
      },
      options,
    );

  update = (id: string, input: IdentityRoleUpdateDto, options?: RequestOptions) =>
    defHttp.request<IdentityRoleDto>(
      {
        method: 'PUT',
        url: `/api/identity/roles/${id}`,
        data: input,
      },
      options,
    );

  updateClaim = (id: string, input: IdentityRoleClaimUpdateDto, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'PUT',
        url: `/api/identity/roles/${id}/claims`,
        data: input,
      },
      options,
    );
}
