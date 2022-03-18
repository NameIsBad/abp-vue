import type { SecurityLogDto, SecurityLogGetByPagedDto } from './security/models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import type { PagedResultDto } from '/@/utils/models/dtos';

export class SecurityLogService {
  apiName = 'AbpAuditing';

  deleteById = (id: string, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/auditing/security-log/${id}`,
      },
      options,
    );

  get = (id: string, options?: RequestOptions) =>
    defHttp.request<SecurityLogDto>(
      {
        method: 'GET',
        url: `/api/auditing/security-log/${id}`,
      },
      options,
    );

  getList = (input: SecurityLogGetByPagedDto, options?: RequestOptions) =>
    defHttp.request<PagedResultDto<SecurityLogDto>>(
      {
        method: 'GET',
        url: '/api/auditing/security-log',
        params: {
          startTime: input.startTime,
          endTime: input.endTime,
          applicationName: input.applicationName,
          identity: input.identity,
          actionName: input.actionName,
          userId: input.userId,
          userName: input.userName,
          clientId: input.clientId,
          correlationId: input.correlationId,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      options,
    );
}
