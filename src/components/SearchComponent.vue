<template>
  <div class="search">
    <div class="search-input-container">
      <input
          v-model="searchTerm"
          @keyup.enter="performSearch"
          class="search-input"
          type="text"
          placeholder="통합검색">
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const searchTerm = ref("");

// search-request 이벤트 선언
const emit = defineEmits<{
  (event: "search-request", searchTerm: string): void
}>();

// 부모에게 search-request 이벤트 발행
const performSearch = () => {
  emit("search-request", searchTerm.value);
}
</script>

<style scoped>
@import "@/assets/css/search.css";
</style>
