<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import { AuthStatusInjectKey, LogoutInjectKey } from "./AuthKeys.mjs";

const router = useRouter();
const logout = inject(LogoutInjectKey);
const authStatus = inject(AuthStatusInjectKey);

async function clickLogout(event) {
  console.log("logout...")
  let status = await logout()
  //console.log("status",status);
  if(status.api=="LOGOUT"){
    router.push("/")
  }
}
</script>
<template>
  <div v-if="authStatus=='auth'">
    <label>Are you sure to sign out ? </label>
    <button @click="clickLogout">Logout</button> 
  </div>
  <div v-else>
    <label>Logout! </label>
  </div>
</template>
