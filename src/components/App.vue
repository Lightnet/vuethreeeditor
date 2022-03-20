<script>

// https://vuejs.org/api/reactivity-core.html#computed
import { computed, reactive, ref } from '@vue/runtime-core';
import Home from './pages/Home.vue';
import About from './pages/About.vue';
import NotFound from './pages/NotFound.vue';
import SignIn from './auth/SignIn.vue';
import SignUp from './auth/SignUp.vue';
import SignOut from './auth/SignOut.vue';

import ThreePage from './three/ThreePage.vue';
import AccessTest from './auth/AccessTest.vue';
import TestLab from './pages/TestLab.vue';

//console.log(process.browser)

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

export default {
  inject: ['message'],
  data() {
    return {
        currentPath: window.location.hash
      , status: reactive({value:"login"})
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  provide() {
    return {
      // explicitly provide a computed property
        message: computed(() => this.message)
      , status: computed({
        get:()=>{
          return this.status.value
        },set:(val)=>{
          this.status.value = val;
        }
      })
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      console.log(window.location.hash)
		  this.currentPath = window.location.hash
		})
  }
}
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