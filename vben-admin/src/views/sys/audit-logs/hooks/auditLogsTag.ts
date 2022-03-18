import { EntityChangeType } from '/@/api/proxy/auditing';

export function useAuditLog() {
  const changeTypeColorMap = {
    [EntityChangeType.Created]: { color: '#87d068', value: '新增' },
    [EntityChangeType.Updated]: { color: '#108ee9', value: '修改' },
    [EntityChangeType.Deleted]: { color: 'red', value: '删除' },
  };
  const methodColorMap: { [key: string]: string } = {
    ['GET']: 'blue',
    ['POST']: 'green',
    ['PUT']: 'orange',
    ['DELETE']: 'red',
    ['OPTIONS']: 'cyan',
    ['PATCH']: 'pink',
  };
  const entityChangeTypeColor = (changeType: EntityChangeType) =>
    changeTypeColorMap[changeType].color;

  const entityChangeType = (changeType: EntityChangeType) => changeTypeColorMap[changeType].value;

  const httpMethodColor = (method: string) => methodColorMap[method];

  const httpStatusCodeColor = (statusCode: number) => {
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

  return {
    httpMethodColor,
    httpStatusCodeColor,
    entityChangeTypeColor,
    entityChangeType,
  };
}
