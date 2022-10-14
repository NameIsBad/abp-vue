import { LoginParams } from './model/userModel';
import { ErrorMessageMode } from '/#/axios';
import { LoginService, UserLoginInfoDto } from '/@/api/proxy/authentication';
import { useAbpStoreWithOut } from '/@/store/modules/abp';

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  const tokenParams: UserLoginInfoDto = {
    userName: params.username,
    password: params.password,
  };
  return new LoginService().loginByLogin(tokenParams, {
    errorMessageMode: mode,
  });
}

/**
 * @description: getUserInfo
 */
export async function getUserInfo() {
  const abpStore = useAbpStoreWithOut();
  await abpStore.initlizeAbpApplication();
  return abpStore.getApplication;
}

export function getPermCode() {
  const abpStore = useAbpStoreWithOut();
  const grantedPolicies = abpStore.getApplication.auth.grantedPolicies;
  const authPermissions = new Array<string>();
  if (grantedPolicies) {
    Object.keys(grantedPolicies).forEach((key) => {
      if (grantedPolicies[key]) {
        authPermissions.push(key);
      }
    });
  }
  return authPermissions;
}

export function doLogout() {
  const abpStore = useAbpStoreWithOut();
  abpStore.resetSession();
}
export function testRetry() { }
