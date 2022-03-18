import { useI18n } from '/@/hooks/web/useI18n';
import { useTable } from '/@/components/Table';
import { AuditLogService } from '/@/api/proxy/auditing';
import { getDataColumns, getSearchFormSchemas } from '../datas/TableData';

const { t } = useI18n();
export function useAuditLogsTable() {
  const { getList } = new AuditLogService();
  const [registerTable] = useTable({
    rowKey: 'id',
    title: '审计日志',
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
    clickToRowSelect: false,
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
