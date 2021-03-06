import { useI18n } from '/@/hooks/web/useI18n';
import { useTable } from '/@/components/Table';
import { IdentityClaimValueType, IdentityClaimTypeService } from '/@/api/proxy/identity';
import { getDataColumns } from '../datas/TableData';
import { getSearchFormSchemas } from '../datas/ModalData';
import { Modal } from 'ant-design-vue';

export function useClaimTable() {
  const { t } = useI18n();
  const valueTypeMap = {
    [IdentityClaimValueType.String]: 'String',
    [IdentityClaimValueType.Int]: 'Int',
    [IdentityClaimValueType.Boolean]: 'Boolean',
    [IdentityClaimValueType.DateTime]: 'DateTime',
  };
  const { getList, deleteById } = new IdentityClaimTypeService();
  const [registerTable, { reload: reloadTable }] = useTable({
    rowKey: 'id',
    title: t('AbpIdentity.Roles'),
    columns: getDataColumns(),
    api: getList,
    pagination: true,
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    immediate: true,
    rowSelection: { type: 'checkbox' },
    formConfig: getSearchFormSchemas(),
    actionColumn: {
      width: 180,
      title: t('table.action'),
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  function handleDelete(role) {
    Modal.warning({
      title: t('AbpUi.AreYouSure'),
      content: t('AbpUi.ItemWillBeDeletedMessageWithFormat', [role.name] as Recordable),
      okCancel: true,
      onOk: () => {
        deleteById(role.id).then(() => {
          reloadTable();
        });
      },
    });
  }

  return {
    valueTypeMap,
    registerTable,
    reloadTable,
    handleDelete,
  };
}
