<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://github.com/troisjs/trois/blob/master/src/effects/UnrealBloomPass.ts
import { UnrealBloomPass } from 'troisjs';
const props = defineProps({
  strength: { type: Number, default: 1.5 },
  radius: { type: Number, default: 0 },
  threshold: { type: Number, default: 0 },
});

</script>
<template>
  <UnrealBloomPass v-bind="props" />
</template>