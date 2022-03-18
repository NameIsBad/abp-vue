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

  const emit = defineEmits(['success']);

  const submiting = ref(false);
  const formElRef = ref<Nullable<FormActionType>>(null);
  const { formSchemas, handleSubmit, getTenant } = useConnectStringModal();
  const [registerModal, { closeModal }] = useModalInner(async (val) => {
    const formEl = unref(formElRef);
    formEl?.resetFields();
    const tenant = await getTenant(val);
    formEl?.setFieldsValue(tenant);
  });

  function handleSaveChanges() {
    const formEl = unref(formElRef);
    formEl?.validate().then(() => {
      submiting.value = true;
      handleSubmit(formEl.getFieldsValue())
        .then(() => {
          emit('success');
          closeModal();
        })
        .finally(() => {
          submiting.value = false;
        });
    });
  }
</script>
