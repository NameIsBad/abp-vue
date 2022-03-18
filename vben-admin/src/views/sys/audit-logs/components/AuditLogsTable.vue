<template>
  <div class="content">
    <BasicTable @register="registerTable">
      <template #httpMethod="{ record }">
        <Tag :color="httpStatusCodeColor(record.httpStatusCode)">{{ record.httpStatusCode }}</Tag>
        <Tag :color="httpMethodColor(record.httpMethod)">{{ record.httpMethod }}</Tag>
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

<script lang="ts" setup>
  import AuditLogsDetail from './AuditLogsDetail.vue';
  import { useAuditLogsTable } from '../hooks/useAuditLogsTable';
  import { useAuditLog } from '../hooks/auditLogsTag';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { Tag } from 'ant-design-vue';

  const { registerTable } = useAuditLogsTable();
  const [registerModal, { openModal }] = useModal();
  const { httpStatusCodeColor, httpMethodColor } = useAuditLog();
  function showDetail(record) {
    openModal(true, record.id, true);
  }
</script>

<style scoped>
  .ant-tag {
    margin-right: 8px;
  }
</style>
