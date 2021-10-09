<template>
  <draggable class="drawing-board" :list="drawingList" :animation="340" group="componentsGroup">
    <draggable-item
      v-for="(item, index) in drawingList"
      :key="item.renderKey"
      :drawing-list="drawingList"
      :current-item="item"
      :index="index"
      :active-id="activeId"
      @activeItem="activeFormItem"
      @copyItem="drawingItemCopy"
      @deleteItem="drawingItemDelete"
    />
  </draggable>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import draggable from 'vuedraggable';
  const drawingList = ref<Array<string>>([]);
  const activeId = ref('');

  function activeFormItem() {}
  function drawingItemCopy() {}
  function drawingItemDelete() {}
</script>
