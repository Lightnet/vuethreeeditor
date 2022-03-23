<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://troisjs.github.io/guide/
// https://troisjs.github.io/guide/core/renderer.html#props-from-three-webglrenderer
// https://troisjs.github.io/guide/core/renderer.html#custom-render-function
//import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
//import { Box, Camera, LambertMaterial, PointLight, Renderer, Scene, AmbientLight } from 'troisjs';

import { inject, onMounted, onUnmounted, ref } from 'vue';
import { AmbientLight, Camera, Renderer, Scene, Mesh } from 'troisjs';

import EntityBox from '../entity/EntityBox.vue';
import EntityTransformControl from '../editor/EntityTransformControl.vue';
import { ENTITIES } from '../context/EntityComponents.mjs';
import { EntitiesInjectKey, SelectObjectUUIDInjectKey } from '../context/EntityKeys.mjs';

const entities = inject(EntitiesInjectKey);

const selectObjectUUID = inject(SelectObjectUUIDInjectKey);

const renderer = ref();
const scene = ref();
const refBox = ref();

onMounted(() =>{
  //https://troisjs.github.io/guide/core/raf.html
  //console.log("renderer.value.three.cameraCtrl")
  //console.log(renderer.value.three.cameraCtrl)

});

onUnmounted(() =>{
  
});

//check entity object types for element setup component
function checkEntityComp(entity){
  let componentEntity = ENTITIES.find(item=>item.dataType == entity.dataType)
  if(componentEntity){
    return componentEntity.comp;
  }else{
    return EntityBox;
  }
}

//resize="window"
</script>
<template>
  <div class="viewport">
  <Renderer ref="renderer"  resize="div" orbitCtrl >
    <Camera ref="camera" :position="{ z: 10 }" />
    <Scene ref="scene">
      <AmbientLight :intensity="0.1"/>
      <Mesh ref="refBox" />
      <EntityTransformControl :selectObjectID="selectObjectUUID"/>
      <!--<Box><LambertMaterial /></Box>-->
      <template v-for="entity in  entities" :key="entity.id">
        <component :is="checkEntityComp(entity)" v-bind="entity" />
      </template>
    </Scene>
  </Renderer>
  </div>
</template>
<style>
.viewport {
  position: fixed;
  top: 20px;
  left: 200px;
  height: calc(100% - 40px);
  width: calc(100% - 400px);
  background: lightgrey;
}
</style>