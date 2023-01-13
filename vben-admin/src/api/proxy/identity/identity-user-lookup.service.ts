import type { UserLookupCountInputDto, UserLookupSearchInputDto } from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import type { ListResultDto } from '/@/utils/models/dtos';
import type { UserData } from '../users/models';

export class IdentityUserLookupService {
  apiName = 'AbpIdentity';

  findById = (id: string, requestOptions?: RequestOptions) =>
    defHttp.request<UserData>(
      {
        method: 'GET',
        url: `/api/identity/users/lookup/${id}`,
      },
      requestOptions,
    );

  findByUserName = (userName: string, requestOptions?: RequestOptions) =>
    defHttp.request<UserData>(
      {
        method: 'GET',
        url: `/api/identity/users/lookup/by-username/${userName}`,
      },
      requestOptions,
    );

  getCount = (input: UserLookupCountInputDto, requestOptions?: RequestOptions) =>
    defHttp.request<number>(
      {
        method: 'GET',
        url: '/api/identity/users/lookup/count',
        params: {
          filter: input.filter,
        },
      },
      requestOptions,
    );

  search = (input: UserLookupSearchInputDto, requestOptions?: RequestOptions) =>
    defHttp.request<ListResultDto<UserData>>(
      {
        method: 'GET',
        url: '/api/identity/users/lookup/search',
        params: {
          filter: input.filter,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      requestOptions,
    );
}
