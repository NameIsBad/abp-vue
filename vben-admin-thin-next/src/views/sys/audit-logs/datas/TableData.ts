import { BasicColumn } from '/@/components/Table/src/types/table';

export function getDataColumns(): BasicColumn[] {
  return [
    {
      title: 'id',
      dataIndex: 'id',
      width: 1,
      ifShow: false,
    },
    {
      title: 'Http请求',
      dataIndex: 'httpMethod',
      width: 'auto',
      sorter: true,
    },
    {
      title: '用户',
      dataIndex: 'userName',
      width: 'auto',
      sorter: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'clientIpAddress',
      width: 'auto',
      sorter: true,
    },
    {
      title: '时间',
      dataIndex: 'executionTime',
      width: 'auto',
      sorter: true,
    },
    {
      title: '持续时间',
      dataIndex: 'executionDuration',
      width: 'auto',
      sorter: true,
    },
    {
      title: '应用名称',
      dataIndex: 'applicationName',
      width: 'auto',
      sorter: true,
    },
  ];
}
