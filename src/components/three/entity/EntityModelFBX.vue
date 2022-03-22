<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    scale is 100:1

*/
// https://troisjs.github.io/guide/models/
import { FbxModel, LambertMaterial } from 'troisjs';

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
const parameters = props.parameters || {src:"/box.fbx"}
//console.log(position);

function onPointerEvent(event) {
  console.log(event);
  console.log(event.component.mesh)
}
function onError(e){
  console.log("onError")
  console.log(e)
}
function onReady(e){
  console.log("onReady")
  console.log(e)
}
// v-bind="parameters"
// @click="onPointerEvent"
// src="/box.fbx"
</script>

<template>
  <Suspense>
    <FbxModel 
      @load="onReady"
      @error="onError"
      :position="{ x: position[0],y: position[1],z: position[2]}"
      :rotation="{ x: rotation[0],y: rotation[1],z: rotation[2]}"
      :scale="{ x: scale[0],y: scale[1],z: scale[2]}"
      :src="props.parameters.src"
      >
      <LambertMaterial />
    </FbxModel>
  </Suspense>
</template>
<!--
src="/path/to/your/model.gltf"
<Box>
  <LambertMaterial />
</Box>
-->