import type { UserLookupCountInputDto, UserLookupSearchInputDto } from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import type { ListResultDto } from '/@/utils/models/dtos';
import type { UserData } from '../users/models';

export class IdentityUserLookupService {
  apiName = 'AbpIdentity';

  findById = (id: string, options?: RequestOptions) =>
    defHttp.request<UserData>(
      {
        method: 'GET',
        url: `/api/identity/users/lookup/${id}`,
      },
      options,
    );

  findByUserName = (userName: string, options?: RequestOptions) =>
    defHttp.request<UserData>(
      {
        method: 'GET',
        url: `/api/identity/users/lookup/by-username/${userName}`,
      },
      options,
    );

  getCount = (input: UserLookupCountInputDto, options?: RequestOptions) =>
    defHttp.request<number>(
      {
        method: 'GET',
        url: '/api/identity/users/lookup/count',
        params: {
          filter: input.filter,
        },
      },
      options,
    );

  search = (input: UserLookupSearchInputDto, options?: RequestOptions) =>
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
      options,
    );
}
