<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://vuedose.tips/going-3d-with-trois-js-and-vue-3/
import { Box, LambertMaterial } from 'troisjs';
import { inject } from 'vue';

const selectObjectUUID = inject("selectObjectUUID");

const props = defineProps({
    objectid: String
  , dataType: String
  , name: String
  , visible:Boolean
  , parameters:Object
  , position:Array
  , rotation:Array
  , scale:Array
  , material:Array
  , shape:String
  , mass:Number
})
//console.log(props);
const position = props.position || [0,0,0]
const rotation = props.rotation || [0,0,0]
const scale = props.scale || [1,1,1]
const parameters = props.parameters || {width:1,height:1,depth:1,}
//console.log(position);

function onPointerEvent(event) {
  //console.log(event);
  //console.log(event.component.mesh);
  console.log("event.component.mesh.uuid")
  console.log(event.component.mesh.uuid)
  //console.log(selectObjectUUID)
  selectObjectUUID.value = event.component.mesh.uuid;
}

</script>
<!-- 
:width="parameters.width"
    :height="parameters.height"
    :depth="parameters.depth"
-->
<template>
  <Box 
    :position="{ x: position[0],y: position[1],z: position[2]}"
    :rotation="{ x: rotation[0],y: rotation[1],z: rotation[2]}"
    :scale="{ x: scale[0],y: scale[1],z: scale[2]}"
    v-bind="parameters"
    @click="onPointerEvent"
    >
    <LambertMaterial />
  </Box>
</template>
<!--
<Box>
  <LambertMaterial />
</Box>
-->