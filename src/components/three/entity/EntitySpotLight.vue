<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { SpotLight } from 'troisjs';
const props = defineProps({
    objectid: String
  , dataType: String
  , name: String
  , visible:Boolean
  , parameters:Object
  , position:Array
  , rotation:Array
  , scale:Array
})
const position = props.position || [0,0,0]
const rotation = props.rotation || [0,0,0]
const scale = props.scale || [1,1,1]
console.log(props);
</script>

<template>
  <SpotLight />
</template>