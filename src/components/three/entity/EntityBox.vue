<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://vuedose.tips/going-3d-with-trois-js-and-vue-3/

import { Box } from 'troisjs';
import EntityMaterialParse from "../material/EntityMaterialParse.vue";
import { inject } from 'vue';
import { SelectObjectUUIDInjectKey, SelectObjectIDInjectKey } from '../context/EntityKeys.mjs';

const selectObjectUUID = inject(SelectObjectUUIDInjectKey);
const selectObjectID = inject(SelectObjectIDInjectKey);

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

function initMesh(iMesh){
  iMesh.userData.mass = props.mass || 0;
  //iMesh.userData.collisionFilterGroup = GROUP3;
  //iMesh.userData.collisionFilterMask = GROUP1;
  //iMesh.userData.shapeType="Box";
  //iMesh.userData.isTrigger=true;
  //iMesh.userData.onCollide=function(event){
    //console.log("collide?")
  //}
}

function onPointerEvent(event) {
  //console.log(event);
  //console.log(event.component.mesh);
  //console.log("event.component.mesh.uuid")
  //console.log(event.component.mesh.uuid)
  //console.log(selectObjectUUID)
  console.log("props.objectid///")
  console.log(props.objectid)
  selectObjectID.value = props.objectid;
  selectObjectUUID.value = event.component.mesh.uuid;
}

</script>
<template>
  <Box 
    @created="initMesh"
    :position="{ x: position[0],y: position[1],z: position[2]}"
    :rotation="{ x: rotation[0],y: rotation[1],z: rotation[2]}"
    :scale="{ x: scale[0],y: scale[1],z: scale[2]}"
    v-bind="parameters"
    @click="onPointerEvent"
    >
    <EntityMaterialParse :material="props.material" />
  </Box>
</template>