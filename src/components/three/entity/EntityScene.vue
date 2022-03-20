<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://vuedose.tips/going-3d-with-trois-js-and-vue-3/
import { Scene } from 'troisjs';
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
//scene need position?
const position = props.position || [0,0,0]
const rotation = props.rotation || [0,0,0]
const scale = props.scale || [1,1,1]
console.log(props);
/*

*/
</script>

<template>
  <Scene
    :position="{ x: position[0],y: position[1],z: position[2]}"
    :rotation="{ x: rotation[0],y: rotation[1],z: rotation[2]}"
    :scale="{ x: scale[0],y: scale[1],z: scale[2]}"    
  >
    <slot></slot>
  </Scene>
</template>