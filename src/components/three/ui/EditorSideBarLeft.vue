<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { Box, Camera, LambertMaterial, PointLight, Renderer, Scene } from 'troisjs';
import EntityViewProps from "../property/EntityViewProps.vue"


export default {
  //components: { Box, Camera, LambertMaterial, PointLight, Renderer, Scene },
  components:{
    EntityViewProps
    
  }
};
</script>

<template>
  <div class="sidebarleft">
    <EntityViewProps/>
  </div>
</template>

<style scoped>
.sidebarleft {
  position: fixed;
  top:20px;
  left: 0px;
  height: calc(100% - 40px);
  width: 200px;
  background: gray;
}
</style>