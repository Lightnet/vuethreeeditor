<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://troisjs.github.io/guide/
// https://troisjs.github.io/guide/core/renderer.html#props-from-three-webglrenderer
// https://troisjs.github.io/guide/core/renderer.html#custom-render-function

import { inject, onMounted, ref } from 'vue';
import { Box, Camera, LambertMaterial, PointLight, Renderer, Scene, AmbientLight } from 'troisjs';

import EntityBox from '../entity/EntityBox.vue';
import { ENTITIES } from '../context/EntityComponents.mjs';

const entities = inject('entities');
const renderer = ref();

onMounted(() =>{
  console.log("mount editor...")
  console.log(renderer.value)
});

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
<!--
<EntityBox/>
-->
<template>
  <div class="viewport">
  <Renderer ref="renderer"  resize="div" orbitCtrl >
    <Camera :position="{ z: 10 }" />
    <Scene>
      <AmbientLight :intensity="0.1"/>
      <PointLight :position="{ y: 50, z: 50 }" />
      <template v-for="entity in  entities" :key="entity.id">
        <component :is="checkEntityComp(entity)" v-bind="entity" />
      </template>
    </Scene>
  </Renderer>
  </div>
</template>
<!--
<Box>
  <LambertMaterial />
</Box>
<Renderer :height="'400px'" :width="'800'">
-->
<style scoped>
.viewport {
  position: fixed;
  top: 20px;
  left: 200px;
  height: calc(100% - 40px);
  width: calc(100% - 400px);
  background: lightgrey;
}
</style>