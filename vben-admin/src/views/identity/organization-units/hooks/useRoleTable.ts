import { ComputedRef } from 'vue';
import { Modal } from 'ant-design-vue';
import { ref, unref, watch } from 'vue';
import { useTable } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { getDataColumns } from '../../role/datas/TableData';
import { IdentityRoleDto } from '/@/api/proxy/identity';
import { OrganizationUnitService } from '/@/api/proxy/identity';
import { MemberProps } from '../types/props';
// import { removeOrganizationUnit } from '/@/api/identity/role';

interface UseRoleTable {
  getProps: ComputedRef<MemberProps>;
}

export function useRoleTable({ getProps }: UseRoleTable) {
  const { t } = useI18n();
  const dataSource = ref([] as IdentityRoleDto[]);
  const { removeRoles, getRoles } = new OrganizationUnitService();
  const [registerTable] = useTable({
    rowKey: 'id',
    columns: getDataColumns(),
    dataSource: dataSource,
    pagination: false,
    striped: false,
    useSearchForm: false,
    showTableSetting: true,
    tableSetting: {
      redo: false,
    },
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    immediate: false,
    rowSelection: { type: 'checkbox' },
    actionColumn: {
      width: 220,
      title: t('table.action'),
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  function handleDelete(role) {
    Modal.warning({
      title: t('AbpIdentity.AreYouSure'),
      content: t('AbpIdentity.OrganizationUnit:AreYouSureRemoveRole', [role.name] as Recordable),
      okCancel: true,
      onOk: () => {
        removeRoles(role.id, unref(getProps).ouId).then(() => reloadRoles());
      },
    });
  }

  function reloadRoles() {
    getRoles(unref(getProps).ouId, {
      skipCount: 0,
      sorting: '',
      maxResultCount: 1000,
    }).then((res) => {
      dataSource.value = res.items || [];
    });
  }

  watch(
    () => unref(getProps).ouId,
    (id) => {
      if (id) {
        reloadRoles();
      }
    },
  );

  return {
    registerTable,
    reloadRoles,
    handleDelete,
  };
}
