import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import type { ApplicationApiDescriptionModel, ApplicationApiDescriptionModelRequestDto } from '../http/modeling/models';

export class AbpApiDefinitionService {
  apiName = 'abp';

  getByModel = (model: ApplicationApiDescriptionModelRequestDto, options?: RequestOptions) =>
    defHttp.request<ApplicationApiDescriptionModel>(
      {
        method: 'GET',
        url: '/api/abp/api-definition',
        params: {
          includeTypes: model.includeTypes,
        },
      },
      options,
    );
}
