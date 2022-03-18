<template>
  <div class="content">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          v-if="hasPermission('AbpTenantManagement.Tenants.Create')"
          type="primary"
          @click="handleAddNew"
        >
          添加
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :stop-button-propagation="true"
          :dropDownActions="[
            {
              auth: 'AbpTenantManagement.Tenants.Update',
              label: '编辑',
              onClick: editTenant.bind(null, record),
            },
            {
              auth: 'AbpTenantManagement.Tenants.ManageConnectionStrings',
              label: '连接字符串',
              onClick: editConnectString.bind(null, record),
            },
            {
              auth: 'AbpTenantManagement.Tenants.ManageFeatures',
              label: '特性',
              onClick: editFeatures.bind(null, record),
            },
            {
              auth: 'AbpTenantManagement.Tenants.Delete',
              label: '删除',
              onClick: handleDelete.bind(null, record),
            },
          ]"
        >
          <template #more>
            <a-button type="primary">
              操作
              <DownOutlined style="margin-left: 8px !important" />
            </a-button>
          </template>
        </TableAction>
      </template>
    </BasicTable>
    <TenantModal @register="registerTenantModal" @success="reload" />
    <ConnectStringModal @register="registerConnectStringModal" @success="reload" />
    <FeatureModal @register="registerFeatureModal" />
  </div>
</template>

<script lang="ts" setup>
  import { DownOutlined } from '@ant-design/icons-vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useTenantsTable } from '../hooks/useTenantTable';
  import { useModal } from '/@/components/Modal';
  import { usePermission } from '/@/hooks/web/usePermission';
  import TenantModal from './TenantModal.vue';
  import ConnectStringModal from './ConnectStringModal.vue';
  import { FeatureModal } from '../../../feature';

  const { hasPermission } = usePermission();
  const { registerTable, handleDelete, reload } = useTenantsTable();
  const [registerTenantModal, { openModal: openTenantModal }] = useModal();
  const [registerConnectStringModal, { openModal: openConnectStringModal }] = useModal();
  const [registerFeatureModal, { openModal: openFeatureModal }] = useModal();

  function handleAddNew() {
    openTenantModal(true, {});
  }

  function editTenant(record) {
    openTenantModal(true, record);
  }

  function editFeatures(record) {
    openFeatureModal(true, {
      providerName: 'T',
      providerKey: record.id,
    });
  }

  function editConnectString(record) {
    openConnectStringModal(true, record.id);
  }
</script>
