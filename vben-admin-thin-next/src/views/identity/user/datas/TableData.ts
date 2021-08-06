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
      title: t('common.userName'),
      dataIndex: 'userName',
      align: 'left',
      width: 280,
      sorter: true,
    },
    {
      title: t('common.email'),
      dataIndex: 'email',
      align: 'left',
      width: 260,
      sorter: true,
    },
    {
      title: t('identity.user.firstName'),
      dataIndex: 'surname',
      align: 'left',
      width: 200,
      sorter: true,
    },
    {
      title: t('identity.user.lastName'),
      dataIndex: 'name',
      align: 'left',
      width: 270,
      sorter: true,
    },
    {
      title: t('common.phoneNumber'),
      dataIndex: 'phoneNumber',
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
