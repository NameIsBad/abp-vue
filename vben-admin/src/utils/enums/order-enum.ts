import { OrderStatus } from '/@/api/proxy/orders/order-status.enum';
import { OrderSourceEnum } from '/@/api/proxy/orders/order-source-enum.enum';
import { OrderProfitSharingEnum } from '/@/api/proxy/orders/order-profit-sharing-enum.enum';
import { OrderTypeEnum } from '/@/api/proxy/orders/order-type-enum.enum';
import { RechargeCardStatus } from '/@/api/proxy/orders/recharge-card-status.enum';

export const orderStatus: Record<OrderStatus, string> = {
  [OrderStatus.Cancel]: '取消',
  [OrderStatus.Complete]: '完成',
  [OrderStatus.Pending]: '待付款',
  [OrderStatus.Refund]: '退款',
};

export const orderSource: Record<OrderSourceEnum, string> = {
  [OrderSourceEnum.MiniProgram]: '小程序',
  [OrderSourceEnum.WeChatOfficialAccounts]: '公众号',
};

export const orderProfitSharing: Record<OrderProfitSharingEnum, string> = {
  [OrderProfitSharingEnum.NoProfitSharing]: '待分账',
  [OrderProfitSharingEnum.ProfitSharingFail]: '分账失败',
  [OrderProfitSharingEnum.ProfitSharinged]: '分账完成',
};

export const orderType: Record<OrderTypeEnum, string> = {
  [OrderTypeEnum.InteriorRechargeCard]: '内部人员充值卡',
  [OrderTypeEnum.Normal]: '充值',
  [OrderTypeEnum.RechargeCard]: '充值卡',
};

export const rechargeCardStatus: Record<RechargeCardStatus, string> = {
  [RechargeCardStatus.已使用]: '已使用',
  [RechargeCardStatus.未使用]: '未使用',
};
