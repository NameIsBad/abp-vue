import type {
  IdentityClaimTypeCreateDto,
  IdentityClaimTypeDto,
  IdentityClaimTypeGetByPagedDto,
  IdentityClaimTypeUpdateDto,
} from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import type { ListResultDto, PagedResultDto } from '/@/utils/models/dtos';

export class IdentityClaimTypeService {
  apiName = 'AbpIdentity';

  create = (input: IdentityClaimTypeCreateDto, options?: RequestOptions) =>
    defHttp.request<IdentityClaimTypeDto>(
      {
        method: 'POST',
        url: '/api/identity/claim-types',
        data: input,
      },
      options,
    );

  deleteById = (id: string, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/identity/claim-types/${id}`,
      },
      options,
    );

  get = (id: string, options?: RequestOptions) =>
    defHttp.request<IdentityClaimTypeDto>(
      {
        method: 'GET',
        url: `/api/identity/claim-types/${id}`,
      },
      options,
    );

  getAllList = (options?: RequestOptions) =>
    defHttp.request<ListResultDto<IdentityClaimTypeDto>>(
      {
        method: 'GET',
        url: '/api/identity/claim-types/actived-list',
      },
      options,
    );

  getList = (input: IdentityClaimTypeGetByPagedDto, options?: RequestOptions) =>
    defHttp.request<PagedResultDto<IdentityClaimTypeDto>>(
      {
        method: 'GET',
        url: '/api/identity/claim-types',
        params: {
          filter: input.filter,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      options,
    );

  update = (id: string, input: IdentityClaimTypeUpdateDto, options?: RequestOptions) =>
    defHttp.request<IdentityClaimTypeDto>(
      {
        method: 'PUT',
        url: `/api/identity/claim-types/${id}`,
        data: input,
      },
      options,
    );
}
