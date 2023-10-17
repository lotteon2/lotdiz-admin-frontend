<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import NavBar from '@/common/NavBar.vue';
</script>

<template>
  <header>
    <NavBar />
  </header>
  <div>
    <RouterView />
  </div>
 
</template>