import type { Ref } from 'vue';
import { unref, computed, watch } from 'vue';
import { AuditLog } from '/@/api/auditing/model/auditLogModel';
import { formatToDateTime } from '/@/utils/dateUtil';
import { getById } from '/@/api/auditing/auditLog';

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

  watch(
    () => record.value.id,
    async (val) => {
      record.value = await getById(val);
    }
  );

  return {
    actionTitle,
    formatDateVal,
  };
}
