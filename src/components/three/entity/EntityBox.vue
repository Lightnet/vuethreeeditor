<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://vuedose.tips/going-3d-with-trois-js-and-vue-3/
// https://troisjs.github.io/guide/lights/
import { Box, Camera, LambertMaterial, PointLight, Renderer, Scene } from 'troisjs';
export default {
  components: { Box, Camera, LambertMaterial, PointLight, Renderer, Scene },
};
</script>

<template>
  <Box>
    <LambertMaterial />
  </Box>
</template>