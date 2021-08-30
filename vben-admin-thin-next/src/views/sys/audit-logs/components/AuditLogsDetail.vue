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
        <Descriptions :column="1" bordered>
          <DescriptionsItem label="Http状态码" :labelStyle="{ width: '140px' }">
            <Tag :color="httpStatusCodeColor(record.httpStatusCode || -1)">{{
              record.httpStatusCode
            }}</Tag>
          </DescriptionsItem>
          <DescriptionsItem label="Http方法">
            <Tag :color="httpMethodColor(record.httpMethod || '')">{{ record.httpMethod }}</Tag>
          </DescriptionsItem>
          <DescriptionsItem label="Url">{{ record.url }}</DescriptionsItem>
          <DescriptionsItem label="客户端IP地址">
            {{ record.clientIpAddress }}
          </DescriptionsItem>
          <DescriptionsItem label="客户端名称">{{ record.clientName }}</DescriptionsItem>
          <DescriptionsItem label="异常">
            <div>
              <pre lang="c-sharp">{{ record.exceptions }}</pre>
            </div>
          </DescriptionsItem>
          <DescriptionsItem label="用户名">{{ record.userName }}</DescriptionsItem>
          <DescriptionsItem label="时间">{{
            formatDateVal(record.executionTime)
          }}</DescriptionsItem>
          <DescriptionsItem label="持续时间">{{ record.executionDuration }}</DescriptionsItem>
          <DescriptionsItem label="浏览器信息">{{ record.browserInfo }}</DescriptionsItem>
          <DescriptionsItem label="应用名称">{{ record.applicationName }}</DescriptionsItem>
          <DescriptionsItem label="关联Id">{{ record.correlationId }}</DescriptionsItem>
          <DescriptionsItem label="评论">{{ record.comments }}</DescriptionsItem>
          <DescriptionsItem label="额外属性">{{ record.extraProperties }}</DescriptionsItem>
        </Descriptions>
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
  import { AuditLog } from '/@/api/auditing/model/auditLogModel';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useAuditLog } from '../hooks/auditLogsTag';
  import { useAuditLogsDetail } from '../hooks/useAuditLogsDetail';
  import { Descriptions, Tabs, Collapse, Tag } from 'ant-design-vue';
  const DescriptionsItem = Descriptions.Item;
  const TabPane = Tabs.TabPane;
  const CollapsePanel = Collapse.Panel;

  const record = ref<AuditLog>({} as AuditLog);
  const id = ref('');
  let data = reactive({
    activeKey: ['0'],
    tableKey: '1',
  });

  const [registerModal] = useModalInner(async (val) => {
    data.activeKey = ['0'];
    data.tableKey = '1';
    id.value = val;
  });
  const { actionTitle, formatDateVal } = useAuditLogsDetail({ id, record });

  const { httpStatusCodeColor, httpMethodColor } = useAuditLog();
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
