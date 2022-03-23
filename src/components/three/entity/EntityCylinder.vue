<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { Cylinder } from 'troisjs';
import EntityMaterialParse from "../material/EntityMaterialParse.vue";
import { inject } from 'vue';
import { SelectObjectUUIDInjectKey } from '../context/EntityKeys.mjs';

const selectObjectUUID = inject(SelectObjectUUIDInjectKey);

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
const parameters = props.parameters || {radiusTop:1, radiusBottom : 1 , height: 1 , radialSegments: 8};

function onPointerEvent(event) {
  selectObjectUUID.value = event.component.mesh.uuid;
}

</script>

<template>
  <Cylinder 
    :position="{ x: position[0],y: position[1],z: position[2]}"
    :rotation="{ x: rotation[0],y: rotation[1],z: rotation[2]}"
    :scale="{ x: scale[0],y: scale[1],z: scale[2]}"
    v-bind="parameters"
    @click="onPointerEvent"
    >
    <EntityMaterialParse :material="props.material" />
  </Cylinder>
</template>