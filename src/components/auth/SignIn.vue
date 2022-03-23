<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthStatusInjectKey, LoginInjectKey } from "./AuthKeys.mjs";

const router = useRouter();
const authStatus = inject(AuthStatusInjectKey)
const login = inject(LoginInjectKey)

const alias = ref("q");
const passphrase = ref("q");

async function clickLogin(event) {
  let status = await login(alias.value,passphrase.value)
  //console.log(status);
  if(status.api=="LOGIN"){
    //console.log("[login]")
    router.push("/")
  }
}
function  clickForgot(event) {
  console.log("login...")
  //console.log(this.status)
  console.log(authStatus.value)
}
</script>
<template>
  <div v-if="authStatus == 'login'">
    <label> Alias: </label><input :value="alias" @input="event => alias = event.target.value" />
    <label> Passphrase: </label><input :value="passphrase" @input="event => passphrase = event.target.value" />
    <button @click="clickLogin">Login</button> 
    <button @click="clickForgot">Forgot</button> 
  </div>
  <div v-if="authStatus == 'auth'">
    <label> Login Auth! </label>
  </div>
</template>
