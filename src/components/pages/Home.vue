<script setup>

// https://router.vuejs.org/guide/advanced/composition-api.html
import { inject } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import ProjectsPageVue from '../three/ProjectsPage.vue';
import AuthAccess from "../auth/AuthAccess.vue";

const user = inject('user')
const token = inject('token')

const router = useRouter()
const route = useRoute()
//console.log(router)
//console.log(route)

</script>
<template>
  <AuthAccess>
    <ProjectsPageVue/>
  </AuthAccess>
</template>
<!--
<template>
  <h1>Home, Welcome {{user}}!</h1>
  <label>Token {{token}}!</label>
  <p> Vitejs, Vuejs, Threejs, troisjs and other packages.  </p>
</template>
-->
<style>
</style>