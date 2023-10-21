<template>
  <div class="sort">
    <div
        class="sort-option"
        v-for="sortOption in sortOptions"
        :key="sortOption"
        :class="{ 'selected': requestedSort === sortOption['value'] }">
      <a href="#" @click="changeSort(sortOption['value'])">{{ sortOption['label'] }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  sortOptions: {
    Type: Array,
    required: true
  },
  requestedSort: {
    Type: String,
    required: true
  },
  changeSort: {
    Type: Function,
    required: true
  }
});
</script>

<style scoped>
@import "@/assets/css/sort.css";
</style>