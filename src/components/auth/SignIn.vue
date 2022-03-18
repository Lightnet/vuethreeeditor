<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { computed } from 'vue'

export default {
  inject: ['message','status','authStatus'],
  data() {
    return {
      alias:"",
      passphrase:"",
    }
  },
  //provide() {
    //return {
      // explicitly provide a computed property
      //status: computed(() => this.status)
    //}
  //},
  mounted() {
    console.log(this.status)
    console.log(this.message)
  },
  methods:{
    clickLogin(event) {
      console.log("login...")
      //console.log(this.status)
      //console.log(this)
      this.status="auth"

      //this.$authStatus("auth")
      console.log(this.authStatus);
      this.authStatus="auth"
      
    },
    clickForgot(event) {
      console.log("login...")
      //console.log(this.status)
      console.log(this.authStatus)
    },
    clickUrl(event) {
      
      console.log(this.API_URL)
    
    }
  }
}
</script>
<template>
  <div>
    <label> Alias: </label><input :value="alias" @input="event => alias = event.target.value" />
    <label> Passphrase: </label><input :value="passphrase" @input="event => passphrase = event.target.value" />
    <button @click="clickLogin">Login</button> 
    <button @click="clickForgot">Forgot</button> 
    <button @click="clickUrl">clickUrl</button> 
  </div>
</template>
