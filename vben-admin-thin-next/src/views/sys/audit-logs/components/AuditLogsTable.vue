<template>
  <div class="content">
    <BasicTable @register="registerTable" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import getColumns from '../datas/TableData';
  import { BasicTable, useTable } from '/@/components/Table';

  export default defineComponent({
    name: 'AutitLogsTable',
    setup() {
      cosnt[(registerTable, {})] = useTable({});
      return {};
    },
  });
</script>
