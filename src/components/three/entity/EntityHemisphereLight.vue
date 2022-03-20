<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { HemisphereLight } from 'troisjs';
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
  <HemisphereLight
    :position="{ x: position[0],y: position[1],z: position[2]}"
    :rotation="{ x: rotation[0],y: rotation[1],z: rotation[2]}"
    :scale="{ x: scale[0],y: scale[1],z: scale[2]}"
   />
</template>