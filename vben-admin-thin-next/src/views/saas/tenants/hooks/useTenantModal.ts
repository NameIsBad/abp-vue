import type { Ref } from 'vue';
import { computed, unref, watch } from 'vue';
import { getModalFormSchemas } from '../datas/ModalData';
import { FormActionType } from '/@/components/Form';
import { TenantDto } from '/@/api/multi-tenancy/models/tenantModel';
import { create, update } from '/@/api/multi-tenancy/tenants';

interface UseTenantFormContext {
  tenantRef: Ref<Nullable<TenantDto>>;
  formElRef: Ref<Nullable<FormActionType>>;
}

export function useTenantModal({ tenantRef, formElRef }: UseTenantFormContext) {
  const formTitle = computed(() => {
    return unref(tenantRef.value)?.id ? '编辑租户' : '添加租户';
  });
  const formSchemas = computed(() => {
    return [...getModalFormSchemas()];
  });

  function handleSubmit(input) {
    return input.id ? update(input.id, input) : create(input);
  }

  watch(
    () => unref(tenantRef.value),
    (tenant) => {
      const formEl = unref(formElRef);
      formEl?.resetFields();
      formEl?.setFieldsValue(tenant);
    },
    {
      immediate: true,
    }
  );

  return {
    formTitle,
    formSchemas,
    handleSubmit,
  };
}
