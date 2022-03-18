import type { AuditLogDto, AuditLogGetByPagedDto } from './logging/models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import type { PagedResultDto } from '/@/utils/models/dtos';

export class AuditLogService {
  apiName = 'AbpAuditing';

  deleteById = (id: string, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'DELETE',
        url: `/api/auditing/audit-log/${id}`,
      },
      options,
    );

  get = (id: string, options?: RequestOptions) =>
    defHttp.request<AuditLogDto>(
      {
        method: 'GET',
        url: `/api/auditing/audit-log/${id}`,
      },
      options,
    );

  getList = (input: AuditLogGetByPagedDto, options?: RequestOptions) =>
    defHttp.request<PagedResultDto<AuditLogDto>>(
      {
        method: 'GET',
        url: '/api/auditing/audit-log',
        params: {
          startTime: input.startTime,
          endTime: input.endTime,
          httpMethod: input.httpMethod,
          url: input.url,
          userId: input.userId,
          userName: input.userName,
          applicationName: input.applicationName,
          correlationId: input.correlationId,
          maxExecutionDuration: input.maxExecutionDuration,
          minExecutionDuration: input.minExecutionDuration,
          hasException: input.hasException,
          httpStatusCode: input.httpStatusCode,
          clientIpAddress: input.clientIpAddress,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      options,
    );
}
