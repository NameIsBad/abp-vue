import { UserStatusEnum, UserTypeEnum } from '/@/api/proxy/member-users';

export const userStatus: Record<UserStatusEnum, string> = {
  [UserStatusEnum.DisEnable]: '停用',
  [UserStatusEnum.Enable]: '正常',
};

export const userType: Record<UserTypeEnum, string> = {
  [UserTypeEnum.Normal]: '普通用户',
  [UserTypeEnum.Insider]: '内部人员',
  [UserTypeEnum.Agent]: '管理员',
};
