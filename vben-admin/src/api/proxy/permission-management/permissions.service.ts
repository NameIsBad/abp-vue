import type { GetPermissionListResultDto, UpdatePermissionsDto } from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

export class PermissionsService {
  apiName = 'AbpPermissionManagement';

  get = (providerName: string, providerKey: string, options?: RequestOptions) =>
    defHttp.request<GetPermissionListResultDto>(
      {
        method: 'GET',
        url: '/api/permission-management/permissions',
        params: {
          providerName,
          providerKey,
        },
      },
      options,
    );

  update = (
    providerName: string,
    providerKey: string,
    input: UpdatePermissionsDto,
    options?: RequestOptions,
  ) =>
    defHttp.request<void>(
      {
        method: 'PUT',
        url: '/api/permission-management/permissions',
        params: {
          providerName,
          providerKey,
        },
        data: input,
      },
      options,
    );
}
