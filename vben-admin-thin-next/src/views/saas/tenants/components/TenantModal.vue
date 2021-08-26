<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    @ok="handleSaveChanges"
    :title="formTitle"
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

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicForm, FormActionType } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useTenantModal } from '../hooks/useTenantModal';
  import { TenantDto } from '/@/api/multi-tenancy/models/tenantModel';
  export default defineComponent({
    name: '',
    components: { BasicForm, BasicModal },
    emits: ['change', 'register'],
    setup(_props, { emit }) {
      const { t } = useI18n();
      const submiting = ref(false);
      const tenantRef = ref<Nullable<TenantDto>>(null);
      const formElRef = ref<Nullable<FormActionType>>(null);
      const [registerModal, { closeModal }] = useModalInner((val) => {
        tenantRef.value = val;
      });
      const { formTitle, formSchemas, handleSubmit } = useTenantModal({ tenantRef, formElRef });

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

      return {
        t,
        submiting,
        formElRef,
        formTitle,
        formSchemas,
        registerModal,
        handleSaveChanges,
      };
    },
  });
</script>
