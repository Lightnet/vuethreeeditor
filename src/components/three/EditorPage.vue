<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import AuthAccess from "../auth/AuthAccess.vue";
import Projects from  "./Projects.vue"
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
//console.log(route.path)
//console.log(route.name)
//console.log(route.query)


</script>

<template>
  <Projects/>
</template>