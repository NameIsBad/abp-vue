import type { AuthenticateResultModel, UserLoginInfoDto } from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

export class LoginService {
  apiName = 'Default';

  loginByLogin = (login: UserLoginInfoDto, requestOptions?: RequestOptions) =>
    defHttp.request<AuthenticateResultModel>(
      {
        method: 'POST',
        url: '/api/login',
        data: login,
      },
      requestOptions,
    );
}
