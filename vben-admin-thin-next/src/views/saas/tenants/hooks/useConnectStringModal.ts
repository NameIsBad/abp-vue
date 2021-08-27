import type { Ref } from 'vue';
import { computed, watch, unref } from 'vue';
import { getConnectStringFormSchemas } from '../datas/ModalData';
import { FormActionType } from '/@/components/Form';
import {
  deleteConnectStringById,
  updateConnectString,
  getConnectStringById,
} from '/@/api/multi-tenancy/tenants';

interface useConnectStringCotext {
  idRef: Ref<Nullable<string>>;
  formElRef: Ref<Nullable<FormActionType>>;
}

export function useConnectStringModal({ idRef, formElRef }: useConnectStringCotext) {
  const formSchemas = computed(() => {
    return [...getConnectStringFormSchemas()];
  });

  function handleSubmit(input) {
    return input.isDefault ? deleteConnectStringById(input) : updateConnectString(input);
  }

  watch(
    () => unref(idRef),
    async (id) => {
      const formEl = unref(formElRef);
      formEl?.resetFields();
      if (!id) return;
      var connectString = await getConnectStringById(id);
      const tenant = {
        id: id,
        defaultConnectionString: connectString,
        isDefault: connectString == null || connectString === '',
      };
      formEl?.setFieldsValue(tenant);
    }
  );

  return {
    formSchemas,
    handleSubmit,
  };
}
