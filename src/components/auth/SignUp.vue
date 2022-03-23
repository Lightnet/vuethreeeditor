<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { inject, ref } from 'vue';
import { RegisterInjectKey } from "./AuthKeys.mjs";

const register = inject(RegisterInjectKey);

const alias = ref("");
const passphrase = ref("");
const status = ref("register");

async function clickRegister(event) {
  //console.log("Register...")
  let data = await register(alias.value,passphrase.value);
  console.log(data)
  status.value=data.api
}
</script>
<template>
  <div v-if="status!='CREATE'">
    <label> Status: {{status}}</label><br>
    <label> Alias: </label><input :value="alias" @input="event => alias = event.target.value" />
    <label> Passphrase: </label><input :value="passphrase" @input="event => passphrase = event.target.value" />
    <button @click="clickRegister">Register</button> 
  </div>
  <div v-else>
    <label> Register!</label><br>
  </div>
</template>
