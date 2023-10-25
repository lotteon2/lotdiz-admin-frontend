<template>
  <div class="sort">
    <div
        class="sort-option"
        v-for="sortOption in sortOptions"
        :key="sortOption.value"
        :class="{ 'selected': requestedSort === sortOption.value }">
      <a href="#" @click="changeSort(sortOption.value)">{{ sortOption.label }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  sortOptions: {
    type: Array as () => Array<{ value: string, label: string }>,
    required: true
  },
  requestedSort: {
    type: String,
    required: true
  },
  changeSort: {
    type: Function,
    required: true
  }
});
</script>

<style scoped>
@import "@/assets/css/sort.css";
</style>