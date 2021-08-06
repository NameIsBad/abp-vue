import { useI18n } from '/@/hooks/web/useI18n';
import { FormProps, FormSchema } from '/@/components/Form';

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
      field: 'concurrencyStamp',
      component: 'Input',
      label: 'concurrencyStamp',
      colProps: { span: 24 },
      ifShow: false,
    },
    {
      field: 'name',
      component: 'Input',
      label: t('identity.role.roleName'),
      colProps: { span: 24 },
      required: true,
    },
    {
      field: 'isPublic',
      component: 'Checkbox',
      label: t('identity.role.isPublic'),
      colProps: { span: 24 },
      renderComponentContent: t('identity.role.isPublic'),
    },
    {
      field: 'isDefault',
      component: 'Checkbox',
      label: t('identity.role.isDefault'),
      colProps: { span: 24 },
      renderComponentContent: t('identity.role.isDefault'),
    },
  ];
}
