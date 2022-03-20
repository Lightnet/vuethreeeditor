<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { Camera  } from 'troisjs';
const props = defineProps({
    objectid: String
  , dataType: String
  , name: String
  , visible:Boolean
  , parameters:Object
  , position:Array
  , rotation:Array
  , scale:Array
  , shape:String
  , mass:Number
})

const position = props.position || [0,0,0]
const rotation = props.rotation || [0,0,0]
const scale = props.scale || [1,1,1]
const parameters = props.parameters || 
{fov :50
, aspect : 1 
, near: 0.1 
, far: 2000
};
console.log(props);
/*

*/
</script>

<template>
  <Camera 
    :position="{ x: position[0],y: position[1],z: position[2]}"
    :rotation="{ x: rotation[0],y: rotation[1],z: rotation[2]}"
    :scale="{ x: scale[0],y: scale[1],z: scale[2]}"
    v-bind="parameters"
  >
    <slot></slot>
  </Camera>
</template>