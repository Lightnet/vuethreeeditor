<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { computed } from 'vue'

export default {
  inject: ['register'],
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
    async clickRegister(event) {
      console.log("Register...")
      let data = await this.register(this.alias,this.passphrase);
      console.log(data)
    },
  }
}
</script>
<template>
  <div>
    <label> Alias: </label><input :value="alias" @input="event => alias = event.target.value" />
    <label> Passphrase: </label><input :value="passphrase" @input="event => passphrase = event.target.value" />
    <button @click="clickRegister">Register</button> 
  </div>
</template>
