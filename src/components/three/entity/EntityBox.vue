
<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://vuedose.tips/going-3d-with-trois-js-and-vue-3/
// https://troisjs.github.io/guide/lights/
// https://vuejs.org/guide/extras/reactivity-transform.html#reactive-props-destructure
// https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits
import { Box, LambertMaterial } from 'troisjs';

const props = defineProps({
    name: String
  , position:Array
})
console.log(props);

</script>

<template>
  
</template>
<!--
<Box>
    <LambertMaterial />
  </Box>
-->