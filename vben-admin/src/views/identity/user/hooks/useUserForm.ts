import { Ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { useI18n } from '/@/hooks/web/useI18n';
import { computed, watch, unref } from 'vue';
import { FormActionType } from '/@/components/Form';
import {
  IdentityUserDto,
  IdentityUserCreateDto,
  IdentityUserUpdateDto,
  IdentityUserService,
} from '/@/api/proxy/identity';
import { getModalFormSchemas } from '../datas/ModalData';

interface UseUserFormContext {
  userRef: Ref<Nullable<IdentityUserDto>>;
  formElRef: Ref<Nullable<FormActionType>>;
}

export function useUserForm({ userRef, formElRef }: UseUserFormContext) {
  const { t } = useI18n();

  const userTitle = computed(() => {
    if (unref(userRef)?.id) {
      return t('AbpIdentity.Edit');
    }
    return t('AbpIdentity.NewUser');
  });

  const userSchemas = computed(() => {
    return [...getModalFormSchemas()];
  });

  function handleSaveUser(val) {
    const service = new IdentityUserService();
    const api = val.id
      ? service.update(val.id, cloneDeep(val) as IdentityUserUpdateDto)
      : service.create(cloneDeep(val) as IdentityUserCreateDto);
    return api;
  }

  async function warpAssignableRoles() {
    const service = new IdentityUserService();
    const { items } = await service.getAssignableRoles();
    const roleOptions = items?.map((role) => {
      return {
        key: role.name,
        label: role.name,
        value: role.name,
      };
    });
    const formEl = unref(formElRef);
    formEl?.updateSchema({
      field: 'roleNames',
      componentProps: {
        options: roleOptions,
      },
    });
  }

  watch(
    () => unref(userRef)?.id,
    async (id) => {
      const formEl = unref(formElRef);
      formEl?.resetFields();
      if (id) {
        const service = new IdentityUserService();
        const user = await service.get(id);
        const userRoles = await service.getRoles(id);
        const roleNames = userRoles.items?.map((role) => role.name);
        userRef.value = user;
        formEl?.setFieldsValue(
          Object.assign(user, {
            roleNames: roleNames,
          }),
        );
      }
    },
  );

  return {
    userTitle,
    userSchemas,
    handleSaveUser,
    warpAssignableRoles,
  };
}
