import type { Ref } from 'vue';

import { computed, unref, watch } from 'vue';
import { IdentityClaimTypeDto, IdentityClaimTypeService } from '/@/api/proxy/identity';
import { FormActionType } from '/@/components/Form';
import { useI18n } from '/@/hooks/web/useI18n';
import { getModalFormSchemas } from '../datas/ModalData';

interface UseClaimModal {
  claimRef: Ref<Nullable<IdentityClaimTypeDto>>;
  formElRef: Ref<Nullable<FormActionType>>;
}

export function useClaimModal({ claimRef, formElRef }: UseClaimModal) {
  const { t } = useI18n();
  const formTitle = computed(() => {
    return unref(claimRef)?.id ? t('AbpIdentity.Edit') : t('AbpIdentity.IdentityClaim:New');
  });
  const formSchemas = computed(() => {
    return [...getModalFormSchemas()];
  });

  function handleSubmit(input) {
    const service = new IdentityClaimTypeService();
    return input.id ? service.update(input.id, input) : service.create(input);
  }

  watch(
    () => unref(claimRef),
    (data) => {
      const formEl = unref(formElRef);
      formEl?.resetFields();
      formEl?.setFieldsValue(data);
    },
    {
      immediate: true,
    },
  );

  return {
    formTitle,
    formSchemas,
    handleSubmit,
  };
}
