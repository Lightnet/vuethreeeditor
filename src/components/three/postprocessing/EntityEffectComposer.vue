<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://troisjs.github.io/guide/postprocessing/
import { EffectComposer } from 'troisjs';

</script>
<template>
  <EffectComposer>
    <slot></slot>
  </EffectComposer>
</template>