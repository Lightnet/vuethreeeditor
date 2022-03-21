<script setup>

// https://vuejs.org/api/reactivity-core.html#computed
import { computed, reactive, ref, unref } from '@vue/runtime-core';
import Home from './pages/Home.vue';
import About from './pages/About.vue';
import NotFound from './pages/NotFound.vue';
import SignIn from './auth/SignIn.vue';
import SignUp from './auth/SignUp.vue';
import SignOut from './auth/SignOut.vue';
import ThreePage from './three/ThreePage.vue';
import AccessTest from './auth/AccessTest.vue';
import TestLab from './pages/TestLab.vue';
import { inject, onMounted, onUnmounted } from 'vue';

const getAccess = inject('getAccess');

const routes = {
  '/': Home,
  '/about': About,
  '/editor': ThreePage,
  '/signin': SignIn,
  '/signup': SignUp,
  '/signout': SignOut,
  '/accesstest': AccessTest,
  '/testlab': TestLab
}
const currentPath = ref(window.location.hash);
const currentView = computed(() =>{
  console.log(routes[unref(currentPath).slice(1) || '/'] || NotFound)
  return routes[unref(currentPath).slice(1) || '/'] || NotFound
})

function hashchange(){
  console.log(window.location.hash)
  currentPath.value = window.location.hash
}
onMounted(()=>{
  getAccess();
  window.addEventListener('hashchange', hashchange)
})
onUnmounted(()=>{
  window.removeEventListener('hashchange', hashchange)
})
</script>

<template>
  <template v-if="currentPath != '#/editor'">
    <div>
    <a href="#/">Home</a><span> | </span>
    <a href="#/editor">Three Editor </a><span> | </span>
    <a href="#/signin">Sign In</a><span> | </span>
    <a href="#/signup">Sign up</a><span> | </span>
    <a href="#/signout">Sign out</a><span> | </span>
    <a href="#/accesstest">Access Test</a><span> | </span>
    <a href="#/testlab">Test Lab</a><span> | </span>
    <a href="#/non-existent-path">Broken Link</a><span> | </span>
    </div>
  </template>
  <component :is="currentView" />
</template>
<!-- 
<a href="#/about">About</a> |
-->