<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :loading="loading"
    :showOkBtn="!loading"
    :showCancelBtn="!loading"
    :title="t('AbpIdentity.OrganizationUnit:SelectUsers')"
    :width="800"
    @visible-change="handleVisibleChange"
    @ok="handleSubmit"
  >
    <BasicTable ref="tableRef" @register="registerTable">
      <template #toolbar>
        <InputSearch
          :placeholder="t('AbpIdentity.Search')"
          v-model:value="filter"
          @search="handleSearch"
        />
      </template>
    </BasicTable>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Input } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, BasicColumn, useTable, TableActionType } from '/@/components/Table';
  import { OrganizationUnitService } from '/@/api/proxy/identity';

  export default defineComponent({
    name: 'MemberModal',
    components: { BasicModal, BasicTable, InputSearch: Input.Search },
    props: {
      ouId: { type: String },
    },
    emits: ['change', 'register'],
    setup(props, { emit }) {
      const { t } = useI18n();
      const loading = ref(false);
      const filter = ref('');
      const tableRef = ref<Nullable<TableActionType>>(null);
      const [registerModal, { closeModal }] = useModalInner();
      const { addUsers, getUnaddedUsers } = new OrganizationUnitService();
      const dataColumns: BasicColumn[] = [
        {
          title: 'id',
          dataIndex: 'id',
          width: 1,
          ifShow: false,
        },
        {
          title: t('AbpIdentity.DisplayName:UserName'),
          dataIndex: 'userName',
          align: 'left',
          width: 280,
          sorter: true,
        },
        {
          title: t('AbpIdentity.EmailAddress'),
          dataIndex: 'email',
          align: 'left',
          width: 'auto',
          sorter: true,
        },
      ];
      const [registerTable] = useTable({
        rowKey: 'id',
        columns: dataColumns,
        api: getUnaddedUsers,
        beforeParams: () => [unref(props).ouId],
        pagination: true,
        striped: false,
        useSearchForm: false,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        immediate: true,
        rowSelection: { type: 'checkbox' },
      });

      function handleSearch() {
        const tableEl = unref(tableRef);
        tableEl?.reload();
        tableEl?.clearSelectedRowKeys();
      }

      function handleVisibleChange(visible) {
        if (visible) {
          handleSearch();
        }
      }

      function handleSubmit() {
        const tableEl = unref(tableRef);
        const selectRows = tableEl?.getSelectRows();
        if (selectRows) {
          loading.value = true;
          addUsers(props.ouId!, {
            userIds: selectRows.map((x) => x.id),
          })
            .then(() => {
              emit('change');
              closeModal();
            })
            .finally(() => {
              loading.value = false;
            });
        }
      }

      return {
        t,
        filter,
        loading,
        tableRef,
        registerModal,
        registerTable,
        handleVisibleChange,
        handleSearch,
        handleSubmit,
      };
    },
  });
</script>
