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

console.log(route.path)
console.log(route.name)
console.log(route.query)

function loadProject(id){
  console.log(id)
  console.log("loadproject",id)
}

</script>

<template>
  <Projects @load-project="loadProject"/>
</template>