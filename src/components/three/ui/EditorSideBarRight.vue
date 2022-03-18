<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { Box, Camera, LambertMaterial, PointLight, Renderer, Scene } from 'troisjs';
import EntityViewProps from "../property/EntityViewProps.vue"
export default {
  //components: { Box, Camera, LambertMaterial, PointLight, Renderer, Scene },
  components: {
    EntityViewProps
  }
};
</script>

<template>
  <div class="sidebarright">
    <EntityViewProps/>
  </div>
</template>

<style scoped>
.sidebarright {
  position: fixed;
  top:20px;
  right: 0px;
  height: calc(100% - 40px);
  width: 200px;
  background: gray;
}
</style>