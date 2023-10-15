<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import NavBar from '@/common/NavBar.vue';
</script>

<template>
  <div class="container">
    <header>
      <NavBar />
    </header>
    <div>
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
@import "./assets/css/main.css";
</style>