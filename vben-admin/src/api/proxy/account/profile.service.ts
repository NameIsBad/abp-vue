import type {
  ChangePasswordInput,
  ProfileDto,
  UpdateProfileDto,
} from './models';
import { RequestOptions } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

export class ProfileService {
  apiName = 'AbpAccount';

  changePassword = (input: ChangePasswordInput, options?: RequestOptions) =>
    defHttp.request<void>(
      {
        method: 'POST',
        url: '/api/account/my-profile/change-password',
        data: input,
      },
      options,
    );

  get = (options?: RequestOptions) =>
    defHttp.request<ProfileDto>(
      {
        method: 'GET',
        url: '/api/account/my-profile',
      },
      options,
    );

  update = (input: UpdateProfileDto, options?: RequestOptions) =>
    defHttp.request<ProfileDto>(
      {
        method: 'PUT',
        url: '/api/account/my-profile',
        data: input,
      },
      options,
    );
}
