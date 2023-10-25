<template>
  <div class="signin-box" @click.stop="">
    <div class="signin-form">
      <div class="signin-form-group">
        <div class="signin-form-username-label">아이디</div>
        <input class="signin-form-username" type="text" :ref="username" v-model="username"/>
      </div>
      <div class="signin-form-group">
        <div class="signin-form-password-label">비밀번호</div>
        <input class="signin-form-password" type="password" :ref="password" v-model="password"/>
      </div>
      <div class="signin-form-submit-group">
        <input class="signin-form-submit" type="submit" @click="onSubmit" value="로그인"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/services/common/AuthStore";
import {ref} from "vue";

interface SignInForm {
  username: string,
  password: string
}

const username = ref<string>("");
const password = ref<string>("");
function onSubmit() {
  const authStore = useAuthStore();
  const signInForm: SignInForm = {
    username: username.value,
    password: password.value
  }

  authStore.login(signInForm.username, signInForm.password);
}
</script>

<style scoped>
@import "../assets/css/signin.css";
</style>