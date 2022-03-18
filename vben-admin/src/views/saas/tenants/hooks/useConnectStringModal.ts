import { computed } from 'vue';
import { getConnectStringFormSchemas } from '../datas/ModalData';
import { TenantService } from '/@/api/proxy/tenant-management';

export function useConnectStringModal() {
  const formSchemas = computed(() => {
    return [...getConnectStringFormSchemas()];
  });

  const {
    deleteDefaultConnectionString,
    updateDefaultConnectionString,
    getDefaultConnectionString,
  } = new TenantService();

  function handleSubmit(input) {
    return input.isDefault
      ? deleteDefaultConnectionString(input)
      : updateDefaultConnectionString(input.id, input.defaultConnectionString);
  }

  async function getTenant(id: string) {
    if (!id) return null;
    const connectString = await getDefaultConnectionString(id);
    const tenant = {
      id: id,
      defaultConnectionString: connectString,
      isDefault: connectString == null || connectString === '',
    };
    return tenant;
  }

  // watch(
  //   () => unref(idRef),
  //   async (id) => {
  //     const formEl = unref(formElRef);
  //     formEl?.resetFields();
  //     if (!id) return;
  //     var connectString = await getConnectStringById(id);
  //     const tenant = {
  //       id: id,
  //       defaultConnectionString: connectString,
  //       isDefault: connectString == null || connectString === '',
  //     };
  //     formEl?.setFieldsValue(tenant);
  //   },
  // );

  return {
    formSchemas,
    getTenant,
    handleSubmit,
  };
}
