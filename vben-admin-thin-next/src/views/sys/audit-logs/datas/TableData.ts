import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps } from '/@/components/Form';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();
export function getDataColumns(): BasicColumn[] {
  return [
    {
      title: 'Http请求',
      dataIndex: 'httpMethod',
      width: 'auto',
      sorter: true,
      align: 'left',
      slots: { customRender: 'httpMethod' },
    },
    {
      title: '用户',
      dataIndex: 'userName',
      width: 120,
      sorter: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'clientIpAddress',
      width: 150,
      sorter: true,
    },
    {
      title: '时间',
      dataIndex: 'executionTime',
      width: 200,
      sorter: true,
    },
    {
      title: '持续时间',
      dataIndex: 'executionDuration',
      width: 90,
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

export function getSearchFormSchemas(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'filter',
        component: 'Input',
        label: t('AbpIdentity.Search'),
        colProps: { span: 24 },
        defaultValue: '',
      },
    ],
  };
}
