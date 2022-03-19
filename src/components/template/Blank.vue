<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://vuejs.org/api/options-lifecycle.html#created
//import { Box, Camera, LambertMaterial, PointLight, Renderer, Scene } from 'troisjs';
export default {
  data(){
    return {}
  },
  components: { },
  beforeMount(){},
  mounted(){
    console.log("mount!")
  },
  beforeUpdate(){
    console.log("beforeUpdate!")
  },
  updated(){
    console.log("updated!")
  },
  unmounted(){
    console.log("unmounted!")
  },
  methods:{

  }
};
</script>

<template>
  <div>
  
  </div>
</template>

<style>

</style>