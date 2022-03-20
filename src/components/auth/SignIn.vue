<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
export default {
  inject: ['authStatus','login'],
  data() {
    return {
      alias:"q",
      passphrase:"q",
    }
  },
  methods:{
    async clickLogin(event) {
      let baccess = await this.login(this.alias,this.passphrase)
      console.log(baccess)
    },
    clickForgot(event) {
      console.log("login...")
      //console.log(this.status)
      console.log(this.authStatus)
    },
  }
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
