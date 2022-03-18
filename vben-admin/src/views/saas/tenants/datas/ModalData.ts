import { FormSchema } from '/@/components/Form';

export function getModalFormSchemas(): FormSchema[] {
  return [
    {
      field: 'id',
      component: 'Input',
      label: 'id',
      colProps: { span: 24 },
      ifShow: false,
    },
    {
      field: 'name',
      component: 'Input',
      label: '租户名称',
      colProps: { span: 24 },
      required: true,
    },
    {
      field: 'adminEmailAddress',
      component: 'Input',
      label: '管理员邮件地址 ',
      colProps: { span: 24 },
      rules: [
        {
          required: true,
          type: 'email',
        },
      ],
      ifShow: ({ values }) => {
        if (values.id) {
          return false;
        }
        return true;
      },
    },
    {
      field: 'adminPassword',
      component: 'InputPassword',
      label: '管理员密码 ',
      colProps: { span: 24 },
      required: true,
      ifShow: ({ values }) => {
        if (values.id) {
          return false;
        }
        return true;
      },
    },
    {
      field: 'isDefault',
      component: 'Checkbox',
      label: '使用共享数据库',
      colProps: { span: 24 },
      ifShow: ({ values }) => {
        if (values.id) {
          return false;
        }
        return true;
      },
    },
    {
      field: 'defaultConnectionString',
      component: 'Input',
      label: '连接字符串',
      colProps: { span: 24 },
      show: ({ values }) => {
        if (values.id || values.isDefault) {
          return false;
        }
        return true;
      },
    },
  ];
}

export function getConnectStringFormSchemas(): FormSchema[] {
  return [
    {
      field: 'id',
      component: 'Input',
      label: 'id',
      colProps: { span: 24 },
      ifShow: false,
    },
    {
      field: 'isDefault',
      component: 'Checkbox',
      label: '使用共享数据库',
      colProps: { span: 24 },
    },
    {
      field: 'defaultConnectionString',
      component: 'Input',
      label: '连接字符串',
      colProps: { span: 24 },
      show: ({ values }) => {
        return !values.isDefault;
      },
    },
  ];
}
