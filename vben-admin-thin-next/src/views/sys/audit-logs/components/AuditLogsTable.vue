<template>
  <div class="content">
    <BasicTable @register="registerTable">
      <template #httpMethod="{ record }">
        <Tag :color="statusCode(record.httpStatusCode)">{{ record.httpStatusCode }}</Tag>
        <Tag :color="httpMethod(record.httpMethod)">{{ record.httpMethod }}</Tag>
        {{ record.url }}
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '详情',
              auth: 'AbpAuditing.AuditLog',
              icon: 'ant-design:search-outlined',
              onClick: showDetail.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <AuditLogsDetail @register="registerModal" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import AuditLogsDetail from './AuditLogsDetail.vue';
  import { useAuditLogsTable } from '../hooks/useAuditLogsTable';
  import { statusCode, httpMethod } from '../hooks/auditLogsTag';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { Tag } from 'ant-design-vue';

  export default defineComponent({
    name: 'AutitLogsTable',
    components: {
      AuditLogsDetail,
      BasicTable,
      TableAction,
      Tag,
    },
    setup() {
      const { registerTable } = useAuditLogsTable();
      const [registerModal, { setModalProps, openModal }] = useModal();

      function showDetail(record) {
        setModalProps({
          showOkBtn: false,
          cancelText: '关闭',
          width: '1000px',
        });
        openModal(true, record.id, true);
      }

      return {
        registerTable,
        statusCode,
        httpMethod,
        showDetail,
        registerModal,
      };
    },
  });
</script>

<style scoped>
  .ant-tag {
    margin-right: 8px;
  }
</style>
