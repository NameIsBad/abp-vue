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
      title: t('identity.role.roleName'),
      dataIndex: 'name',
      align: 'left',
      width: 'auto',
      sorter: true,
    },
  ];
}

export function getClaimColumns(): BasicColumn[] {
  return [
    {
      title: 'id',
      dataIndex: 'id',
      width: 1,
      ifShow: false,
    },
    {
      title: t('identity.claim.claimType'),
      dataIndex: 'claimType',
      align: 'left',
      width: 150,
      sortOrder: true,
    },
    {
      title: t('identity.claim.claimValue'),
      dataIndex: 'claimValue',
      align: 'left',
      width: 'auto',
      sortOrder: true,
    },
  ];
}
