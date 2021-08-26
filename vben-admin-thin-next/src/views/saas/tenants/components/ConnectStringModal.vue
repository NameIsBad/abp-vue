<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    @ok="handleSaveChanges"
    title="编辑连接字符串"
    :loading="submiting"
  >
    <BasicForm
      ref="formElRef"
      :colon="true"
      :schemas="formSchemas"
      :label-width="120"
      :show-action-button-group="false"
      :action-col-options="{
        span: 24,
      }"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicForm, FormActionType } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useConnectStringModal } from '../hooks/useConnectStringModal';
  import { TenantConnectionString } from '/@/api/multi-tenancy/models/tenantModel';
  import { getConnectStringById } from '/@/api/multi-tenancy/tenants';

  const emit = defineEmits(['change', 'register']);

  const submiting = ref(false);
  const tenantRef = ref<Nullable<TenantConnectionString>>(null);
  const formElRef = ref<Nullable<FormActionType>>(null);
  const [registerModal, { closeModal }] = useModalInner(async (val) => {
    var connectString = await getConnectStringById(val);
    tenantRef.value = {
      id: val,
      defaultConnectionString: connectString,
    };
    const formEl = unref(formElRef);
    formEl?.resetFields();
    formEl?.setFieldsValue(tenantRef.value);
  });
  const { formSchemas, handleSubmit } = useConnectStringModal();

  function handleSaveChanges() {
    const formEl = unref(formElRef);
    formEl?.validate().then(() => {
      submiting.value = true;
      handleSubmit(formEl.getFieldsValue())
        .then(() => {
          emit('change');
          closeModal();
        })
        .finally(() => {
          submiting.value = false;
        });
    });
  }
</script>
