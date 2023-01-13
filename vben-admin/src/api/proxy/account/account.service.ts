import type {
  RegisterDto,
  ResetPasswordDto,
  SendPasswordResetCodeDto,
  VerifyPasswordResetTokenInput,
} from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import type { IdentityUserDto } from '../identity/models';

export class AccountService {
  apiName = 'AbpAccount';

  register = (input: RegisterDto, requestOptions?: RequestOptions) =>
    defHttp.request<IdentityUserDto>(
      {
        method: 'POST',
        url: '/api/account/register',
        data: input,
      },
      requestOptions,
    );

  resetPassword = (input: ResetPasswordDto, requestOptions?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'POST',
        url: '/api/account/reset-password',
        data: input,
      },
      requestOptions,
    );

  sendPasswordResetCode = (input: SendPasswordResetCodeDto, requestOptions?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'POST',
        url: '/api/account/send-password-reset-code',
        data: input,
      },
      requestOptions,
    );

  verifyPasswordResetToken = (
    input: VerifyPasswordResetTokenInput,
    requestOptions?: RequestOptions,
  ) =>
    defHttp.request<boolean>(
      {
        method: 'POST',
        url: '/api/account/verify-password-reset-token',
        data: input,
      },
      requestOptions,
    );
}
