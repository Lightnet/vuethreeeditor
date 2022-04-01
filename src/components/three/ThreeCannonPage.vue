<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet

  Information: Testing.

*/
import ThreeCannon from "./ThreeCannon.vue";
if(!import.meta.env.SSR){
  //return;
}else{
  //return {};
}
</script>

<template>
  <client-only>
    <ThreeCannon />
  </client-only>
</template>