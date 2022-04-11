<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet

  Information: Test Three.js
*/

import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { Box, Camera, LambertMaterial, PointLight, Renderer, Scene, Text, Sprite } from 'troisjs/build/trois.module';
import TestAdd from './tests/TestAdd.mjs';
import TestChildAdd from './tests/TestChildAdd.mjs';
const renderer = ref();

onMounted(() =>{
console.log("renderer")
console.log(renderer.value.three.renderer.domElement)
console.log("renderer///")
});

</script>
<template>
  <div>
  <Renderer ref="renderer" resize="window" orbitCtrl>
    <Scene>
      <Camera :position="{ z: 10 }" />
      <TestAdd>
        <TestChildAdd></TestChildAdd>
      </TestAdd>
      <PointLight :position="{ y: 50, z: 50 }" />
      <Box :position="{ y: -2, z: -1 }">
        <LambertMaterial />
      </Box>
    </Scene>
  </Renderer>
  </div>
</template>