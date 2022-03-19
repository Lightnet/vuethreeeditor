<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { Box, Camera, LambertMaterial, PointLight, Renderer, Scene } from 'troisjs';

import EditorSideBarTop from "./ui/EditorSideBarTop.vue";
import EditorSideBarRight from "./ui/EditorSideBarRight.vue";
import EditorSideBarLeft from "./ui/EditorSideBarLeft.vue";
import EditorViewport3D from "./ui/EditorViewport3D.vue";

export default {
  //components: { Box, Camera, LambertMaterial, PointLight, Renderer, Scene },
  components: {
      EditorSideBarTop
    , EditorSideBarLeft
    , EditorSideBarRight
    , EditorViewport3D
  },
  mounted(){
    console.log("mount!")
  },
};
</script>

<template>

  <div class="editor">
    <EditorSideBarTop/>
    <EditorSideBarLeft/>
    <EditorSideBarRight/>
    <EditorViewport3D/>
  </div>
</template>

<style scoped>
.editor {
  position: fixed;
  top:0px;
  left: 0px;
}
</style>