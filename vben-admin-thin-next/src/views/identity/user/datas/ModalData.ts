import { useI18n } from '/@/hooks/web/useI18n';
import { FormProps, TabFormSchema } from '/@/components/Form';

const { t } = useI18n();

export function getSearchFormSchemas(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'filter',
        component: 'Input',
        label: t('common.search'),
        colProps: { span: 24 },
        defaultValue: '',
      },
    ],
  };
}

export function getModalFormSchemas(): TabFormSchema[] {
  return [
    {
      tab: t('identity.user.userInformations'),
      field: 'id',
      component: 'Input',
      label: 'id',
      colProps: { span: 24 },
      show: false,
    },
    {
      tab: t('identity.user.userInformations'),
      field: 'concurrencyStamp',
      component: 'Input',
      label: 'concurrencyStamp',
      colProps: { span: 24 },
      show: false,
    },
    {
      tab: t('identity.user.userInformations'),
      field: 'userName',
      component: 'Input',
      label: t('common.userName'),
      colProps: { span: 24 },
      required: true,
    },
    {
      tab: t('identity.user.userInformations'),
      field: 'password',
      component: 'InputPassword',
      label: t('common.password'),
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
      tab: t('identity.user.userInformations'),
      field: 'surname',
      component: 'Input',
      label: t('identity.user.firstName'),
      colProps: { span: 24 },
    },
    {
      tab: t('identity.user.userInformations'),
      field: 'name',
      component: 'Input',
      label: t('identity.user.lastName'),
      colProps: { span: 24 },
    },
    {
      tab: t('identity.user.userInformations'),
      field: 'email',
      component: 'Input',
      label: t('common.email'),
      colProps: { span: 24 },
      required: true,
    },
    {
      tab: t('identity.user.userInformations'),
      field: 'phoneNumber',
      component: 'Input',
      label: t('common.phoneNumber'),
      colProps: { span: 24 },
    },
    {
      tab: t('identity.user.userInformations'),
      field: 'lockoutEnabled',
      component: 'Checkbox',
      label: t('identity.user.lockoutEnabled'),
      colProps: { span: 24 },
      defaultValue: true,
      renderComponentContent: t('identity.user.lockoutEnabled'),
    },
    {
      tab: t('identity.user.roles'),
      field: 'roleNames',
      component: 'Select',
      label: t('identity.user.roles'),
      colProps: { span: 24 },
      componentProps: {
        mode: 'multiple',
      },
      // render: ({ model, field }) => {
      //   return h(Select, {
      //     mode: 'multiple',
      //     value: model[field],
      //     onSelect: (val) => {
      //       console.log(val);
      //       model[field].push(val);
      //     },
      //   });
      // },
    },
  ];
}
