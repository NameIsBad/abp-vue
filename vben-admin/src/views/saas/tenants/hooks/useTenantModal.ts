import { computed } from 'vue';
import { getModalFormSchemas } from '../datas/ModalData';
import { TenantService } from '/@/api/proxy/tenant-management';

export function useTenantModal() {
  const formSchemas = computed(() => {
    return [...getModalFormSchemas()];
  });

  function handleSubmit(input) {
    const { update, create } = new TenantService();
    return input.id ? update(input.id, input) : create(input);
  }

  return {
    formSchemas,
    handleSubmit,
  };
}
