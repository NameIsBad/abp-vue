import { computed } from 'vue';
import { ChangeType } from '/@/api/auditing/model/auditLogModel';

export function useAuditLog() {
  const changeTypeColorMap = {
    [ChangeType.Created]: { color: '#87d068', value: '新增' },
    [ChangeType.Updated]: { color: '#108ee9', value: '修改' },
    [ChangeType.Deleted]: { color: 'red', value: '删除' },
  };
  const methodColorMap: { [key: string]: string } = {
    ['GET']: 'blue',
    ['POST']: 'green',
    ['PUT']: 'orange',
    ['DELETE']: 'red',
    ['OPTIONS']: 'cyan',
    ['PATCH']: 'pink',
  };
  const entityChangeTypeColor = computed(() => {
    return (changeType: ChangeType) => changeTypeColorMap[changeType].color;
  });
  const entityChangeType = computed(() => {
    return (changeType: ChangeType) => changeTypeColorMap[changeType].value;
  });
  const httpMethodColor = computed(() => {
    return (method: string) => {
      return methodColorMap[method];
    };
  });
  const httpStatusCodeColor = computed(() => {
    return (statusCode: number) => {
      if (statusCode >= 200 && statusCode < 300) {
        return '#87d068';
      }
      if (statusCode >= 300 && statusCode < 400) {
        return '#108ee9';
      }
      if (statusCode >= 400 && statusCode < 500) {
        return 'orange';
      }
      if (statusCode >= 500) {
        return 'red';
      }
      return 'cyan';
    };
  });

  return {
    httpMethodColor,
    httpStatusCodeColor,
    entityChangeTypeColor,
    entityChangeType,
  };
}
