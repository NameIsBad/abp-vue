<template>
  <AuditLogsTable />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import AuditLogsTable from './components/AuditLogsTable.vue';
  export default defineComponent({
    name: 'audtiLogs',
    components: { AuditLogsTable },
    setup() {
      return {};
    },
  });
</script>

<style></style>
