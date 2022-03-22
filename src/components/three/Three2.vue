<script>
import { Box, Camera, LambertMaterial, PointLight, Renderer, Scene, Text, Sprite } from 'troisjs';
export default {
  components:{
    Renderer,
    Camera,
    PointLight,
    Box,
    LambertMaterial,
    Scene,
  },
  mounted() {
    const renderer = this.$refs.renderer;
    console.log("renderer")
    console.log(renderer)
    console.log(renderer.three.renderer.domElement)
    var container = document.getElementById('viewport'); // 'mastheadBackground' is my header id
    console.log(container)
    console.log("container")
    container.appendChild(renderer.three.renderer.domElement);
    const box = this.$refs.box.mesh;
    renderer.onBeforeRender(() => {
      box.rotation.x += 0.01;
    });
    
  },
};
</script>
<template>
  <div id="viewport" style="height:100%;width:100%;"></div>
  <Renderer ref="renderer">
    <Camera :position="{ z: 10 }" />
    <Scene>
      <PointLight :position="{ y: 50, z: 50 }" />
      <Box ref="box" :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }">
        <LambertMaterial />
      </Box>
    </Scene>
  </Renderer>
</template>
<!--

-->