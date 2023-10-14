<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './common/Navbar.vue';
</script>

<template>
  <header>
    <Navbar />
  </header>

  <RouterView />
</template>