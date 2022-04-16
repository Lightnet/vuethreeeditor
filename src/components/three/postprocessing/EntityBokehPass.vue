<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://troisjs.github.io/guide/postprocessing/
// https://github.com/troisjs/trois/blob/master/src/effects/BokehPass.ts
import { BokehPass } from 'troisjs';

const props = defineProps({
  focus: { type: Number, default: 1 },
  aperture: { type: Number, default: 0.025 },
  maxblur: { type: Number, default: 0.01 },
});

</script>
<template>
  <BokehPass v-bind="props" />
</template>