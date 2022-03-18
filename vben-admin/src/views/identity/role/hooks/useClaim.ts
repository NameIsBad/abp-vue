import type { Ref } from 'vue';

import { useI18n } from '/@/hooks/web/useI18n';
import { Modal } from 'ant-design-vue';
import { FormSchema } from '/@/components/Form';
import { useModal } from '/@/components/Modal';
import { IdentityClaimTypeService, IdentityRoleService } from '/@/api/proxy/identity';
import { getClaimColumns } from '../datas/TableData';
import { useTable } from '/@/components/Table';
import { unref, watch } from 'vue';

interface UseClaim {
  roleIdRef: Ref<string>;
}
// TODO: 与UserClaim重复 需要分离组件
export function useClaim({ roleIdRef }: UseClaim) {
  const { t } = useI18n();
  const { addClaim, deleteClaim, getClaims, updateClaim } = new IdentityRoleService();
  const { getAllList: getActivedList } = new IdentityClaimTypeService();
  const formSchemas: FormSchema[] = [
    {
      field: 'id',
      component: 'Input',
      label: 'id',
      colProps: { span: 24 },
      ifShow: false,
    },
    {
      field: 'claimType',
      component: 'ApiSelect',
      label: t('AbpIdentity.DisplayName:ClaimType'),
      colProps: { span: 24 },
      required: true,
      componentProps: {
        api: () => getActivedList(),
        resultField: 'items',
        labelField: 'name',
        valueField: 'name',
      },
    },
    {
      field: 'claimValue',
      component: 'Input',
      label: t('AbpIdentity.DisplayName:ClaimValue'),
      colProps: { span: 24 },
      required: true,
      ifShow: ({ values }) => {
        return values.id ? false : true;
      },
    },
    {
      field: 'newClaimValue',
      component: 'Input',
      label: t('AbpIdentity.DisplayName:ClaimValue'),
      colProps: { span: 24 },
      required: true,
      ifShow: ({ values }) => {
        return values.id ? true : false;
      },
    },
  ];
  const [registerTable, { reload: reloadTable }] = useTable({
    rowKey: 'id',
    title: t('AbpIdentity.ManageClaim'),
    columns: getClaimColumns(),
    api: getClaims,
    beforeParams: () => [roleIdRef.value],
    pagination: false,
    striped: false,
    useSearchForm: false,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    immediate: false,
    rowSelection: { type: 'checkbox' },
    actionColumn: {
      width: 160,
      title: t('table.action'),
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  const [registerClaimForm, { openModal }] = useModal();

  function openClaimForm(model) {
    if (model.id) {
      openModal(
        true,
        Object.assign(model, {
          newClaimValue: model.claimValue,
        }),
        true,
      );
    } else {
      openModal(true, {}, true);
    }
  }

  function handleDelete(claim) {
    Modal.warning({
      title: t('AbpUi.AreYouSure'),
      content: t('AbpUi.ItemWillBeDeletedMessageWithFormat', [claim.claimValue] as Recordable),
      okCancel: true,
      onOk: () => {
        deleteClaim(unref(roleIdRef), claim).then(() => {
          reloadTable();
        });
      },
    });
  }

  function handleSaveChanges(input) {
    const api = input.id ? updateClaim(unref(roleIdRef), input) : addClaim(unref(roleIdRef), input);
    return api.then(() => {
      reloadTable();
    });
  }

  watch(
    () => unref(roleIdRef),
    (id) => {
      reloadTable({
        searchInfo: {
          id: id,
        },
      });
    },
  );

  return {
    formSchemas,
    registerClaimForm,
    openClaimForm,
    registerTable,
    reloadTable,
    handleSaveChanges,
    handleDelete,
  };
}
