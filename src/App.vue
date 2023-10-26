<template>
  <div class="container">
    <header>
      <Navbar/>
    </header>
    <div class="content">
      <RouterView/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
import Navbar from '@/common/Navbar.vue';

</script>

<style>
@import "./assets/css/main.css";
</style>