import { useTable } from '/@/components/Table';
import { deleteById, getList } from '/@/api/multi-tenancy/tenants';
import { formatPagedRequest } from '/@/utils/http/abp/helper';
import { getDataColumns, getSearchFormSchemas } from '../datas/TableData';
import { useI18n } from '/@/hooks/web/useI18n';
import { Modal } from 'ant-design-vue';

const { t } = useI18n();
export function useTenantsTable() {
  const [registerTable, { reload }] = useTable({
    rowKey: 'id',
    title: '租户',
    columns: getDataColumns(),
    api: getList,
    beforeFetch: formatPagedRequest,
    pagination: true,
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    immediate: true,
    formConfig: getSearchFormSchemas(),
    actionColumn: {
      width: 220,
      title: t('table.action'),
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  function handleDelete(tenant) {
    Modal.warning({
      title: t('AbpUi.AreYouSure'),
      content: t('AbpUi.ItemWillBeDeletedMessageWithFormat', [tenant.name] as Recordable),
      okCancel: true,
      onOk: () => {
        deleteById(tenant.id).then(() => {
          reload();
        });
      },
    });
  }

  return {
    registerTable,
    reload,
    handleDelete,
  };
}
