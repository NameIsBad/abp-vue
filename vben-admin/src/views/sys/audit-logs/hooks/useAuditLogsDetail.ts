import type { Ref } from 'vue';
import { computed, watch } from 'vue';
import { AuditLogService } from '/@/api/proxy/auditing';
import type { AuditLogDto } from '/@/api/proxy/auditing/logging';
import { formatToDateTime } from '/@/utils/dateUtil';
import { getOverAllSchema } from '../datas/ModalData';
import { useDescription } from '/@/components/Description/index';

interface useAuditLogsDetailContext {
  record: Ref<AuditLogDto>;
}

export function useAuditLogsDetail({ record }: useAuditLogsDetailContext) {
  const { get } = new AuditLogService();
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
      record.value = await get(val);
      setOverAllDescProps({ data: record.value });
    },
  );

  return {
    registerOverAll,
    actionTitle,
    formatDateVal,
  };
}
