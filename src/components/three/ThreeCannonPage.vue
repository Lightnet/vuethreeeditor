<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet

  Information: Testing.

*/
if(!import.meta.env.SSR){
  //return;
}else{
  //return {};
}
import ThreeCannon from "./ThreeCannon.vue";

</script>

<template>
  <client-only>
    <ThreeCannon />
  </client-only>
</template>