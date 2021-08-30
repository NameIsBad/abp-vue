import type { Ref } from 'vue';
import { unref, computed, watch } from 'vue';
import { AuditLog } from '/@/api/auditing/model/auditLogModel';
import { formatToDateTime } from '/@/utils/dateUtil';
import { getById } from '/@/api/auditing/auditLog';

interface useAuditLogsDetailContext {
  id: Ref<string>;
  record: Ref<AuditLog>;
}

export function useAuditLogsDetail({ id, record }: useAuditLogsDetailContext) {
  const actionTitle = computed<String>(() => {
    return `操作(${record.value.actions?.length})`;
  });
  const formatDateVal = computed(() => {
    return (dateVal) => formatToDateTime(dateVal, 'YYYY-MM-DD HH:mm:ss');
  });

  watch(
    () => unref(id.value),
    async (val) => {
      record.value = await getById(val);
    }
  );

  return {
    actionTitle,
    formatDateVal,
  };
}
