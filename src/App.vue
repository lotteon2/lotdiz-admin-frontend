<template>
  <div v-if="!accessToken" v-show="!accessToken">
    <SignInComponent />
  </div>
  <div v-else>
    <div class="container">
      <header>
        <Navbar/>
      </header>
      <div class="content">
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
import Navbar from '@/common/Navbar.vue';
import {useAuthStore} from "@/services/common/AuthStore";
import {storeToRefs} from "pinia";
import SignInComponent from "@/components/SignInComponent.vue";

const authStore = useAuthStore();
const accessToken = storeToRefs(authStore).accessToken;
</script>

<style>
@import "./assets/css/main.css";
</style>