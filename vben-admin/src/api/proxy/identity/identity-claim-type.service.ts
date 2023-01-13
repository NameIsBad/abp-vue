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

  create = (input: IdentityClaimTypeCreateDto, requestOptions?: RequestOptions) =>
    defHttp.request<IdentityClaimTypeDto>(
      {
        method: 'POST',
        url: '/api/identity/claim-types',
        data: input,
      },
      requestOptions,
    );

  delete = (id: string, requestOptions?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/identity/claim-types/${id}`,
      },
      requestOptions,
    );

  get = (id: string, requestOptions?: RequestOptions) =>
    defHttp.request<IdentityClaimTypeDto>(
      {
        method: 'GET',
        url: `/api/identity/claim-types/${id}`,
      },
      requestOptions,
    );

  getAllList = (requestOptions?: RequestOptions) =>
    defHttp.request<ListResultDto<IdentityClaimTypeDto>>(
      {
        method: 'GET',
        url: '/api/identity/claim-types/actived-list',
      },
      requestOptions,
    );

  getList = (input: IdentityClaimTypeGetByPagedDto, requestOptions?: RequestOptions) =>
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
      requestOptions,
    );

  update = (id: string, input: IdentityClaimTypeUpdateDto, requestOptions?: RequestOptions) =>
    defHttp.request<IdentityClaimTypeDto>(
      {
        method: 'PUT',
        url: `/api/identity/claim-types/${id}`,
        data: input,
      },
      requestOptions,
    );
}
