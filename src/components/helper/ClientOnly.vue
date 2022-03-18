<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
//console.log("test...?",window)
var isClient=false;
if(typeof window !== "undefined"){
  console.log("WINDOW")
  isClient=true
}else{
  console.log("NOT WINDOW")
  isClient=false
}

export default {
  //components: { Box, Camera, LambertMaterial, PointLight, Renderer, Scene },
  data(){
    return {
      isClient:isClient
    }
  },
  mounted(){
    console.log("mount?",window)
  }
};
</script>

<template>

  <template v-if="isClient">
    <slot/>
  </template>
  
</template>

<style>

</style>