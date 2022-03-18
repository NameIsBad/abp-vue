import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps } from '/@/components/Form';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();
export function getDataColumns(): BasicColumn[] {
  return [
    {
      title: '租户名称',
      dataIndex: 'name',
      align: 'left',
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
