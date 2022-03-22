<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { ref} from 'vue';
import AuthAccess from "../auth/AuthAccess.vue";
import Editor from  "./Editor.vue"
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
//console.log(route.path)
//console.log(route.name)
//console.log(route.query)
const projectID = ref("")
const {projectid} = route.query;
if(projectid){
  projectID.value = String(projectid);
}
</script>

<template>
  <AuthAccess>
    <Editor :projectid="projectID"/>
  </AuthAccess>
</template>