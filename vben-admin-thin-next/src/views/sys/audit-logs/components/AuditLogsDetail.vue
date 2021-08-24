<template>
  <BasicModal @register="registerModal" v-bind="$attrs" title="详情">
    <a-tabs type="card">
      <a-tab-pane key="1" tab="总体">
        <a-descriptions :column="1" bordered>
          <a-descriptions-item label="Http状态码" :labelStyle="{ width: '140px' }">
            <Tag :color="statusCode(record.httpStatusCode)">{{ record.httpStatusCode }}</Tag>
          </a-descriptions-item>
          <a-descriptions-item label="Http方法">
            <Tag :color="httpMethod(record.httpMethod)">{{ record.httpMethod }}</Tag>
          </a-descriptions-item>
          <a-descriptions-item label="Url">{{ record.url }}</a-descriptions-item>
          <a-descriptions-item label="客户端IP地址">
            {{ record.clientIpAddress }}
          </a-descriptions-item>
          <a-descriptions-item label="客户端名称">{{ record.clientName }}</a-descriptions-item>
          <a-descriptions-item label="异常">
            <div>
              <pre lang="c-sharp">{{ record.exceptions }}</pre>
            </div>
          </a-descriptions-item>
          <a-descriptions-item label="用户名">{{ record.userName }}</a-descriptions-item>
          <a-descriptions-item label="时间">{{ record.executionTime }}</a-descriptions-item>
          <a-descriptions-item label="持续时间">{{ record.executionDuration }}</a-descriptions-item>
          <a-descriptions-item label="浏览器信息">{{ record.browserInfo }}</a-descriptions-item>
          <a-descriptions-item label="应用名称">{{ record.applicationName }}</a-descriptions-item>
          <a-descriptions-item label="关联Id">{{ record.correlationId }}</a-descriptions-item>
          <a-descriptions-item label="评论">{{ record.comments }}</a-descriptions-item>
          <a-descriptions-item label="额外属性">{{ record.extraProperties }}</a-descriptions-item>
        </a-descriptions>
      </a-tab-pane>
      <a-tab-pane key="2" :tab="actionTitle">
        <a-collapse v-model:activeKey="activeKey" :style="collapseStyle">
          <a-collapse-panel
            v-for="(item, index) in record.actions"
            :key="index"
            :style="collapsePanelStyle"
            :showArrow="false"
          >
            <template #header>
              <div style="text-align: center">{{ item.serviceName }}</div>
            </template>
            <a-descriptions :column="1" bordered>
              <a-descriptions-item label="持续时间" :labelStyle="{ width: '140px' }">
                {{ item.executionDuration }}ms
              </a-descriptions-item>
              <a-descriptions-item label="参数">
                <pre lang="json">{{ JSON.parse(item.parameters) }}</pre>
              </a-descriptions-item>
            </a-descriptions>
          </a-collapse-panel>
        </a-collapse>
      </a-tab-pane>
    </a-tabs>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { AuditLog } from '/@/api/auditing/model/auditLogModel';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Descriptions, Tabs, Collapse, Tag } from 'ant-design-vue';
  import { getById } from '/@/api/auditing/auditLog';
  import { statusCode, httpMethod } from '../hooks/auditLogsTag';

  export default defineComponent({
    name: 'AutitLogsDetail',
    components: {
      BasicModal,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane,
      [Collapse.name]: Collapse,
      [Collapse.Panel.name]: Collapse.Panel,
      Tag,
    },
    setup() {
      const record = ref({} as AuditLog);
      const activeKey = ref(['0']);
      const [registerModal, { closeModal }] = useModalInner(async (val) => {
        record.value = await getById(val);
      });
      const actionTitle = computed<String>(() => {
        return `操作(${record.value.actions?.length})`;
      });
      const collapseStyle = 'background: #fff;';
      const collapsePanelStyle =
        'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;';
      return {
        registerModal,
        record,
        collapseStyle,
        collapsePanelStyle,
        statusCode,
        httpMethod,
        activeKey,
        closeModal,
        actionTitle,
      };
    },
  });
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
