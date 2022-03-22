<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet

  Information: Test Three.js
*/

// https://vuedose.tips/going-3d-with-trois-js-and-vue-3/
// https://troisjs.github.io/guide/lights/
// https://github.com/troisjs/troisjs.github.io/tree/master/src/public/assets
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_text_shapes.html
//const { Box, Camera, LambertMaterial, PointLight, Renderer, Scene } = await import('troisjs');

import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { Box, Camera, LambertMaterial, PointLight, Renderer, Scene, Text, Sprite } from 'troisjs';
import TestMesh from "./entity/EntityTroisjsObject.vue";
import TestMesh2 from "./entity/EntityTroisjsObject2.vue";

const renderer = ref();
//console.log("renderer")
//console.log(renderer.value)

onMounted(() =>{
console.log("renderer")
console.log(renderer.value.three.renderer.domElement)
//console.log(renderer.value.renderer.domElement)
//console.log(renderer.value.renderer)
console.log("renderer///")
});

</script>
<template>
  <div>
  <Renderer ref="renderer" resize="window" orbitCtrl>
    <Scene>
      <Camera :position="{ z: 10 }" />
      <TestMesh/>
      <TestMesh2/>

      <Sprite src="sprite0.png" />

      <Text
        text="Hello World!"
        :size="12"
        :height="1"
        :depth="0.1"
        font-src="helvetiker_regular.typeface.json" >
        
      </Text>
      <PointLight :position="{ y: 50, z: 50 }" />
      <Box :position="{ y: -2, z: -1 }">
        <LambertMaterial />
      </Box>
    </Scene>
  </Renderer>
  </div>
</template>