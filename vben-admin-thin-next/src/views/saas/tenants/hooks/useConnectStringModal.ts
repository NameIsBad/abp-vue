import { computed } from 'vue';
import { getConnectStringFormSchemas } from '../datas/ModalData';
import { deleteConnectStringById, updateConnectString } from '/@/api/multi-tenancy/tenants';

export function useConnectStringModal() {
  const formSchemas = computed(() => {
    return [...getConnectStringFormSchemas()];
  });

  function handleSubmit(input) {
    return input.isDefault ? updateConnectString(input) : deleteConnectStringById(input);
  }

  return {
    formSchemas,
    handleSubmit,
  };
}
