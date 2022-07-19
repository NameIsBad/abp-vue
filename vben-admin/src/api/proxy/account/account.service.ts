import type { RegisterDto, ResetPasswordDto, SendPasswordResetCodeDto } from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import type { IdentityUserDto } from '../identity/models';

export class AccountService {
  apiName = 'AbpAccount';

  register = (input: RegisterDto, options?: RequestOptions) =>
    defHttp.request<IdentityUserDto>(
      {
        method: 'POST',
        url: '/api/account/register',
        data: input,
      },
      options,
    );

  resetPassword = (input: ResetPasswordDto, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'POST',
        url: '/api/account/reset-password',
        data: input,
      },
      options,
    );

  sendPasswordResetCode = (input: SendPasswordResetCodeDto, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'POST',
        url: '/api/account/send-password-reset-code',
        data: input,
      },
      options,
    );
}
