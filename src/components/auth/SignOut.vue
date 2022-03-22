<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
export default {
  inject: ['logout','authStatus'],
  data() {
    return {
    }
  },
  methods:{
    async clickLogout(event) {
      console.log("logout...")
      let status = await this.logout()
      console.log(status);
    },
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
