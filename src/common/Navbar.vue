<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/member">Member</RouterLink>
        <RouterLink to="/project">Project</RouterLink>
        <RouterLink to="/maker">Maker</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
@import "../assets/css/navbar.css";
</style>