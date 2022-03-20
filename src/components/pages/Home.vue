<script setup>
import { inject } from 'vue';

const user = inject('user')
const token = inject('token')

</script>

<template>
  <h1>Home, Welcome {{user}}!</h1>
  <label>Token {{token}}!</label>
  <p> Vitejs, Vuejs, Threejs, troisjs and other packages.  </p>
</template>

<style>

</style>