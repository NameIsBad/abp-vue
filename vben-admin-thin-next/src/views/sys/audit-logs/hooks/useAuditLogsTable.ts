import { useTable } from '/@/components/Table';
import { formatPagedRequest } from '/@/utils/http/abp/helper';
import { getList, getById, deleteById } from '/@/api/auditing/auditLog';
import { getSearchFormSchemas } from '../datas/ModalData';
import { getDataColumns } from '../datas/TableData';

export function useAuditLogsTable() {
  const [registerTable] = useTable({
    rowKey: 'id',
    title: '审计日志',
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
    rowSelection: { type: 'checkbox' },
    formConfig: getSearchFormSchemas(),
    actionColumn: {
      width: 220,
      title: t('table.action'),
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  return {
    registerTable,
  };
}
