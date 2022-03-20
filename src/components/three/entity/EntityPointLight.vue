<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://vuedose.tips/going-3d-with-trois-js-and-vue-3/
// https://troisjs.github.io/guide/lights/

import { PointLight } from 'troisjs';
const props = defineProps({
    name: String
  , visible:Boolean
  , parameters:Object
  , position:Array
  , rotation:Array
  , scale:Array
})
console.log(props);
</script>

<template>
  <PointLight/>
</template>