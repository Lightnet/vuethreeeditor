<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://github.com/troisjs/trois/blob/master/src/effects/FilmPass.ts
import { FilmPass } from 'troisjs';
const props = defineProps({
  noiseIntensity: { type: Number, default: 0.5 },
  scanlinesIntensity: { type: Number, default: 0.05 },
  scanlinesCount: { type: Number, default: 4096 },
  grayscale: { type: Number, default: 0 },
});

</script>
<template>
  <FilmPass v-bind="props"  />
</template>