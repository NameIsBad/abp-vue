<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    @ok="handleSaveChanges"
    :title="formTitle"
    :loading="submiting"
    :width="660"
    :min-height="400"
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
  import { useClaimModal } from '../hooks/useClaimModal';
  import { IdentityClaimTypeDto } from '/@/api/proxy/identity';
  export default defineComponent({
    name: 'ClaimModal',
    components: { BasicForm, BasicModal },
    emits: ['change', 'register'],
    setup(_props, { emit }) {
      const { t } = useI18n();
      const submiting = ref(false);
      const claimRef = ref<Nullable<IdentityClaimTypeDto>>(null);
      const formElRef = ref<Nullable<FormActionType>>(null);
      const [registerModal, { closeModal }] = useModalInner((val) => {
        claimRef.value = val;
      });
      const { formTitle, formSchemas, handleSubmit } = useClaimModal({ claimRef, formElRef });

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
