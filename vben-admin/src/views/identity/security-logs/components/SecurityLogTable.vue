<template>
  <BasicTable @register="registerTable">
    <template #action="{ record }">
      <TableAction
        :actions="[
          {
            auth: 'AbpIdentity.SecurityLog.Delete',
            color: 'error',
            label: t('AbpUi.Delete'),
            icon: 'ant-design:delete-outlined',
            onClick: handleDelete.bind(null, record),
          },
        ]"
      />
    </template>
  </BasicTable>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Modal } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { getDataColumns } from './TableData';
  import { getSearchFormSchemas } from './ModalData';
  import { SecurityLogService } from '/@/api/proxy/auditing';
  import { formatPagedRequest } from '/@/utils/http/abp/helper';

  const service = new SecurityLogService();
  export default defineComponent({
    name: 'SecurityLogTable',
    components: { BasicTable, TableAction },
    setup() {
      const { t } = useI18n();
      const [registerTable, { reload }] = useTable({
        rowKey: 'id',
        title: t('AbpAuditLogging.SecurityLog'),
        columns: getDataColumns(),
        api: service.getList,
        beforeFetch: formatPagedRequest,
        pagination: true,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: true,
        immediate: true,
        canColDrag: true,
        formConfig: getSearchFormSchemas(),
        actionColumn: {
          width: 120,
          title: t('table.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleDelete(record) {
        Modal.warning({
          title: t('AbpUi.AreYouSure'),
          content: t('AbpUi.ItemWillBeDeletedMessage'),
          okCancel: true,
          onOk: () => {
            service.deleteById(record.id).then(() => {
              reload();
            });
          },
        });
      }

      return {
        t,
        registerTable,
        handleDelete,
      };
    },
  });
</script>
