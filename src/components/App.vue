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

const routes = {
  '/': Home,
  '/about': About,
  '/three': ThreePage,
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
  <template v-if="currentPath != '#/three'">
    <div>
    <a href="#/">Home</a> |
    <a href="#/about">About</a> |
    <a href="#/three">Three</a> |
    <a href="#/signin">Sign In</a> |
    <a href="#/signup">Sign up</a> |
    <a href="#/signout">Sign out</a> |
    <a href="#/accesstest">Access Test</a> |
    <a href="#/testlab">Test Lab</a> |
    <a href="#/non-existent-path">Broken Link</a>
    </div>
  </template>
  <component :is="currentView" />
</template>