<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet

  Information: Testing.

*/
//if(typeof window !== 'undefined'){
  
//}else{
  //return {};
//}
import AuthAccess from "../auth/AuthAccess.vue";
import Three from "./Three.vue";
import Editor from "./Editor.vue";
import ClientOnly from '../helper/ClientOnly.vue';

</script>

<template>
  <client-only>
    <Three/>
  </client-only>
</template>
<!--
<ClientOnly>
</ClientOnly>
<Editor/>
  <AuthAccess>
    <Three/>
  </AuthAccess>
-->