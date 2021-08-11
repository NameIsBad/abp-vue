import { BasicColumn } from '/@/components/Table/src/types/table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export function getDataColumns(): BasicColumn[] {
  return [
    {
      title: 'id',
      dataIndex: 'id',
      width: 1,
      ifShow: false,
    },
    {
      title: t('identity.claim.claim'),
      dataIndex: 'name',
      align: 'left',
      width: 220,
      sorter: true,
    },
    {
      title: t('identity.claim.valueType'),
      dataIndex: 'valueType',
      align: 'left',
      width: 150,
      sorter: true,
      slots: {
        customRender: 'types',
      },
    },
    {
      title: t('identity.claim.regex'),
      dataIndex: 'regex',
      align: 'left',
      width: 180,
      sorter: true,
    },
    {
      title: t('identity.claim.required'),
      dataIndex: 'required',
      align: 'left',
      width: 150,
      sorter: true,
      slots: {
        customRender: 'required',
      },
    },
    {
      title: t('identity.claim.isStatic'),
      dataIndex: 'isStatic',
      align: 'left',
      width: 150,
      sorter: true,
      slots: {
        customRender: 'static',
      },
    },
    {
      title: t('identity.claim.description'),
      dataIndex: 'description',
      align: 'left',
      width: 'auto',
      sorter: true,
    },
  ];
}
