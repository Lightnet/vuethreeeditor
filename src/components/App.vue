<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { inject, onMounted, onUnmounted, onUpdated, ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import {GetAccessInjectKey, AuthStatusInjectKey} from "./auth/AuthKeys.mjs"
import {OnInjectKey} from "./event/eventBusPlugin.mjs";
const currentPath = ref("/");
const getAccess = inject(GetAccessInjectKey);
const authStatus = inject(AuthStatusInjectKey);
//const EventBus = inject('EventBus');
//EventBus.addEventListener('test',()=>{
  //console.log("APP ROOT TEST")
//})

//const $on = useEmitOn();
//$on('test',()=>{
  //console.log("TEST ROOT !!!")
//})

//on('test',(data)=>{
  //console.log("TEST ROOT !s!!")
  //console.log(data)
//})

const on = inject(OnInjectKey);
on('test',()=>{
  console.log("TEST ROOT !s!!")
})


const route = useRoute();

watch(route,()=>{//pass
  currentPath.value=route.path;
})

onMounted(()=>{
  getAccess();
})

onUnmounted(()=>{
  
})
</script>
<template>
  <div>
    <template v-if="currentPath.indexOf('/editor')!==0">
      <router-link to="/">Home</router-link><span> | </span>
      <router-link to="/about">About</router-link><span> | </span>
      <template v-if="authStatus=='auth'">
        <router-link to="/signout">Sign Out</router-link><span> | </span>
      </template>
      <template v-else>
        <router-link to="/signin">Sign In</router-link><span> | </span>
        <router-link to="/signup">Sign Up</router-link><span> | </span>
      </template>
      
      <router-link to="/editor">Editor</router-link><span> | </span>
      <router-link to="/three">Three</router-link><span> | </span>
      <router-link to="/three2">Three2</router-link><span> | </span>
      <router-link to="/threecannon">Three Cannon</router-link><span> | </span>
    </template>
  </div>
  <div id="view" style="height:calc(100% - 18px);width:calc(100% - 20px);">
    <router-view></router-view>
  </div>
</template>