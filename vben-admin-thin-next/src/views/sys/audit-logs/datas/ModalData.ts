import { DescItem } from '/@/components/Description/index';
import { useAuditLog } from '../hooks/auditLogsTag';
import { Tag } from 'ant-design-vue';
import { h } from 'vue-demi';
import { formatToDateTime } from '/@/utils/dateUtil';

export function getOverAllSchema(): DescItem[] {
  const { httpStatusCodeColor, httpMethodColor } = useAuditLog();
  return [
    {
      field: 'httpStatusCode',
      label: 'Http状态码',
      labelStyle: {
        width: '140px',
      },
      render: (curVal) => {
        return h(
          Tag,
          {
            color: httpStatusCodeColor(curVal as number),
          },
          curVal
        );
      },
    },
    {
      field: 'httpMethod',
      label: 'Http方法',
      render: (curVal) => {
        return h(
          Tag,
          {
            color: httpMethodColor(curVal),
          },
          curVal
        );
      },
    },
    {
      field: 'clientIpAddress',
      label: '客户端IP地址',
    },
    {
      field: 'url',
      label: 'Url',
    },
    {
      field: 'clientName',
      label: '客户端名称',
    },
    {
      field: 'exceptions',
      label: '异常',
      render: (curVal) => {
        return h(
          'pre',
          {
            lang: 'c-sharp',
          },
          curVal
        );
      },
    },
    {
      field: 'userName',
      label: '用户名',
    },
    {
      field: 'executionTime',
      label: '时间',
      render: (curVal) => {
        return formatToDateTime(curVal, 'YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      field: 'executionDuration',
      label: '持续时间',
    },
    {
      field: 'browserInfo',
      label: '浏览器信息',
    },
    {
      field: 'applicationName',
      label: '应用名称',
    },
    {
      field: 'correlationId',
      label: '关联Id',
    },
    {
      field: 'comments',
      label: '评论',
    },
    {
      field: 'extraProperties',
      label: '额外属性',
    },
  ];
}
