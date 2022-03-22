<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { inject, onMounted, onUnmounted, onUpdated, ref, watch, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const currentPath = ref("/");
const getAccess = inject('getAccess');
const router = useRouter();
const route = useRoute();
//console.log(router);
//console.log(route);

//watch(route,(route,prevRoute)=>{//pass
  //console.log(route)
//})
watch(route,()=>{//pass
  //console.log(route)
  //console.log(route.path)
  //console.log(route.name)
  //console.log(route.query)
  currentPath.value=route.path;
})

watchEffect(() =>{ // ref() pass
  //console.log(route)//nope
  //console.log("watchEffect")
  //console.log(currentPath.value)
})

//onUpdated(()=>{
  //console.log("update...")
  //console.log(route);
//})
//function hashchange(){
  //console.log(window.location.hash)
  //currentPath.value = window.location.hash
//}
onMounted(()=>{
  getAccess();
  //window.addEventListener('hashchange', hashchange)
})
onUnmounted(()=>{
  //window.removeEventListener('hashchange', hashchange)
})

</script>
<template>
  <div>
    <template v-if="currentPath.indexOf('/editor')!==0">
      <router-link to="/">Home</router-link><span> | </span>
      <router-link to="/about">About</router-link><span> | </span>
      <router-link to="/signin">Sign In</router-link><span> | </span>
      <router-link to="/signup">Sign Up</router-link><span> | </span>
      <router-link to="/editor">Editor</router-link>
    </template>
  </div>
  <div style="height:100%">
    <router-view></router-view>
  </div>
</template>