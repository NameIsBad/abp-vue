<template>
  <div class="m-5">
    <OrganizationUnitPage />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import OrganizationUnitPage from './components/OrganizationUnitPage.vue';

  export default defineComponent({
    components: { OrganizationUnitPage },
  });
</script>
