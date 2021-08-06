<template>
  <InputSearch
    readonly
    :placeholder="t('identity.tenant.switchTenantHint')"
    size="large"
    autoComplete="off"
    @search="openModal()"
    v-model:value="tenantName"
  >
    <template #enterButton>
      <Button> ({{ t('common.switch') }}) </Button>
    </template>
  </InputSearch>
  <BasicModal
    v-bind="$attrs"
    :minHeight="30"
    :canFullscreen="false"
    @register="register"
    :title="t('identity.tenant.switchTenant')"
    @ok="switchTenant"
  >
    <BasicForm
      :schemas="schemas"
      ref="formElRef"
      :showActionButtonGroup="false"
      :actionColOptions="{ span: 24 }"
    />
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Button, Input } from 'ant-design-vue';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { BasicForm, FormSchema, FormActionType } from '/@/components/Form';
  import { Persistent } from '/@/utils/cache/persistent';

  import { findTenantByName } from '/@/api/multi-tenancy/tenants';

  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';

  import { useAbpStoreWithOut } from '/@/store/modules/abp';

  export default defineComponent({
    name: 'MultiTenancyBox',
    components: {
      BasicForm,
      BasicModal,
      Button,
      InputSearch: Input.Search,
    },
    setup() {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const [register, { openModal, closeModal }] = useModal();

      const formElRef = ref<Nullable<FormActionType>>(null);
      const schemas: FormSchema[] = [
        {
          field: 'tenantName',
          component: 'Input',
          label: t('identity.tenant.switchTenantHint'),
          colProps: {
            span: 24,
          },
        },
      ];

      return {
        formElRef,
        register,
        schemas,
        openModal,
        closeModal,
        t,
        createMessage,
      };
    },
    computed: {
      tenantName() {
        const abpStore = useAbpStoreWithOut();
        return abpStore.getApplication?.currentTenant?.name;
      },
    },
    methods: {
      async switchTenant() {
        const field = this.formElRef?.getFieldsValue();
        if (field?.tenantName) {
          const result = await findTenantByName(field.tenantName);
          if (result.success) {
            Persistent.setTenant(result.tenantId);
          } else {
            this.createMessage.warn(
              this.t('identity.tenant.givenTenantIsNotAvailable', [field.tenantName])
            );
          }
        } else {
          Persistent.setTenant('');
        }
        const abpStore = useAbpStoreWithOut();
        await abpStore.initlizeAbpApplication();
        this.closeModal();
      },
    },
  });
</script>
