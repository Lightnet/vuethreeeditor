<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://github.com/troisjs/trois/blob/master/src/effects/HalftonePass.ts
import { HalftonePass } from 'troisjs';
const props = defineProps({
  shape: { type: Number, default: 1 },
  radius: { type: Number, default: 4 },
  rotateR: { type: Number, default: Math.PI / 12 * 1 },
  rotateG: { type: Number, default: Math.PI / 12 * 2 },
  rotateB: { type: Number, default: Math.PI / 12 * 3 },
  scatter: { type: Number, default: 0 },
});
</script>
<template>
  <HalftonePass v-bind="props" />
</template>