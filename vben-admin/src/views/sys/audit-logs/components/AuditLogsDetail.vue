<template>
  <BasicModal
    @register="registerModal"
    v-bind="$attrs"
    title="详情"
    :showOkBtn="false"
    cancelText="关闭"
    width="1000px"
  >
    <Tabs type="card" v-model:activeKey="data.tableKey">
      <TabPane key="1" tab="总体">
        <Description @register="registerOverAll" />
      </TabPane>
      <TabPane key="2" :tab="actionTitle">
        <Collapse v-model:activeKey="data.activeKey" style="background: #fff">
          <CollapsePanel
            v-for="(item, index) in record.actions"
            :key="index"
            style="background: #f7f7f7; border-radius: 4px; margin-bottom: 24px; border: 0"
            :showArrow="false"
          >
            <template #header>
              <div style="text-align: center">{{ item.serviceName }}</div>
            </template>
            <Descriptions :column="1" bordered>
              <DescriptionsItem label="持续时间" :labelStyle="{ width: '140px' }">
                {{ item.executionDuration }}ms
              </DescriptionsItem>
              <DescriptionsItem label="参数">
                <pre lang="json">{{ JSON.parse(item.parameters || '') }}</pre>
              </DescriptionsItem>
            </Descriptions>
          </CollapsePanel>
        </Collapse>
      </TabPane>
    </Tabs>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { Logging } from '/@/api/proxy/auditing';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useAuditLogsDetail } from '../hooks/useAuditLogsDetail';
  import { Description } from '/@/components/Description/index';
  import { Descriptions, Tabs, Collapse } from 'ant-design-vue';
  const DescriptionsItem = Descriptions.Item;
  const TabPane = Tabs.TabPane;
  const CollapsePanel = Collapse.Panel;

  const record = ref<Logging.AuditLogDto>({} as Logging.AuditLogDto);
  let data = reactive({
    activeKey: ['0'],
    tableKey: '1',
  });

  const [registerModal] = useModalInner(async (val) => {
    data.activeKey = ['0'];
    data.tableKey = '1';
    record.value.id = val;
  });
  const { registerOverAll, actionTitle } = useAuditLogsDetail({ record });
</script>

<style scoped>
  pre {
    font-size: 87.5%;
  }
</style>

<style>
  .ant-descriptions-view table {
    table-layout: fixed !important;
  }
</style>
