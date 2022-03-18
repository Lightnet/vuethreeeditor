<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { computed } from 'vue'

export default {
  inject: ['message','status'],
  data() {
    return {
      alias:"",
      passphrase:"",
    }
  },
  mounted() {
    console.log(this.status)
    console.log(this.message)
  },
  methods:{
    clickLogin(event) {
      console.log("login...")
      console.log(this.status)
      console.log(this)
      this.status="auth"
      //console.log(this.$root.status)
      //this.$root.status="auth"
    },
    clickForgot(event) {
      console.log("login...")
      console.log(this.status)
      console.log(this.$root.status)
      //console.log(this.$root.status.value)
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
  </div>
</template>
