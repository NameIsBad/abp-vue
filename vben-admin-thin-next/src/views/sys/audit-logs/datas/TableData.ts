import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps } from '/@/components/Form';
import { useI18n } from '/@/hooks/web/useI18n';
import { RequestEnum, HttpStatusCode } from '/@/enums/httpEnum';

const { t } = useI18n();
export function getDataColumns(): BasicColumn[] {
  return [
    {
      title: 'Http请求',
      dataIndex: 'httpMethod',
      width: 'auto',
      sorter: true,
      align: 'left',
      slots: { customRender: 'httpMethod' },
    },
    {
      title: '用户',
      dataIndex: 'userName',
      width: 120,
      sorter: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'clientIpAddress',
      width: 150,
      sorter: true,
    },
    {
      title: '时间',
      dataIndex: 'executionTime',
      width: 200,
      sorter: true,
    },
    {
      title: '持续时间',
      dataIndex: 'executionDuration',
      width: 90,
      sorter: true,
    },
    {
      title: '应用名称',
      dataIndex: 'applicationName',
      width: 'auto',
      sorter: true,
    },
  ];
}

let httpMethod: any = [];
for (const req in RequestEnum) {
  httpMethod.push({
    label: req,
    value: RequestEnum[req],
  });
}

let httpStatusCode: any = [];
for (const code in HttpStatusCode) {
  httpStatusCode.push({
    label: `${code}-${HttpStatusCode[code]}`,
    value: code,
  });
}

export function getSearchFormSchemas(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'startTime',
        component: 'DatePicker',
        label: '开始时间',
        colProps: { span: 4 },
        componentProps: {
          style: {
            width: '100%',
          },
        },
      },
      {
        field: 'endTime',
        component: 'DatePicker',
        label: '结束时间',
        colProps: { span: 4 },
        componentProps: {
          style: {
            width: '100%',
          },
        },
      },
      {
        field: 'userName',
        component: 'Input',
        label: '用户名',
        colProps: { span: 4 },
      },
      {
        field: 'url',
        component: 'Input',
        label: 'Url过滤',
        colProps: { span: 4 },
      },
      {
        field: 'minExecutionDuration',
        component: 'InputNumber',
        label: '最小持续时间',
        colProps: { span: 4 },
      },
      {
        field: 'maxExecutionDuration',
        component: 'InputNumber',
        label: '最大持续时间',
        colProps: { span: 4 },
      },
      {
        field: 'httpMethod',
        component: 'Select',
        label: 'Http方法',
        colProps: { span: 4 },
        componentProps: {
          options: httpMethod,
        },
      },
      {
        field: 'httpStatusCode',
        component: 'Select',
        label: 'Http状态码',
        colProps: { span: 4 },
        componentProps: {
          options: httpStatusCode,
        },
      },
      {
        field: 'applicationName',
        component: 'Input',
        label: '应用名称',
        colProps: { span: 4 },
      },
      {
        field: 'correlationId',
        component: 'Input',
        label: '关联Id',
        colProps: { span: 4 },
      },
      {
        field: 'hasException',
        component: 'Select',
        label: '存在异常',
        colProps: { span: 4 },
        componentProps: {
          options: [
            {
              label: '是',
              value: 'true',
            },
            {
              label: '否',
              value: 'false',
            },
          ],
        },
      },
    ],
  };
}
