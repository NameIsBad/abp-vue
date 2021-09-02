import type { Ref } from 'vue';
import { computed, watch } from 'vue';
import { AuditLog } from '/@/api/auditing/model/auditLogModel';
import { formatToDateTime } from '/@/utils/dateUtil';
import { getById } from '/@/api/auditing/auditLog';
import { getOverAllSchema } from '../datas/ModalData';
import { useDescription } from '/@/components/Description/index';

interface useAuditLogsDetailContext {
  record: Ref<AuditLog>;
}

export function useAuditLogsDetail({ record }: useAuditLogsDetailContext) {
  const actionTitle = computed<String>(() => {
    return `操作(${record.value.actions?.length})`;
  });
  const formatDateVal = computed(() => {
    return (dateVal) => formatToDateTime(dateVal, 'YYYY-MM-DD HH:mm:ss');
  });
  const [registerOverAll, { setDescProps: setOverAllDescProps }] = useDescription({
    bordered: true,
    data: record.value,
    column: 1,
    schema: getOverAllSchema(),
  });

  watch(
    () => record.value.id,
    async (val) => {
      record.value = await getById(val);
      setOverAllDescProps({ data: record.value });
    }
  );

  return {
    registerOverAll,
    actionTitle,
    formatDateVal,
  };
}
