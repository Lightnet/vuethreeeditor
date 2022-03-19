<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
export default {
  inject: ['logout'],
  data() {
    return {
    }
  },
  methods:{
    clickLogout(event) {
      console.log("logout...")
      this.logout()
    },
  }
}
</script>
<template>
  <div>
    <label>Are you sure to sign out ? </label>
    <button @click="clickLogout">Logout</button> 
  </div>
</template>
