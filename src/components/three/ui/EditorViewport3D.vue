<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://troisjs.github.io/guide/
// https://troisjs.github.io/guide/core/renderer.html#props-from-three-webglrenderer
// https://troisjs.github.io/guide/core/renderer.html#custom-render-function

import { inject, onMounted, onUnmounted, ref, unref } from 'vue';
//import { Box, Camera, LambertMaterial, PointLight, Renderer, Scene, AmbientLight } from 'troisjs';
import { AmbientLight,Box,LambertMaterial, Camera, Renderer, Scene, Mesh } from 'troisjs';
//import { TransformControls } from '../../../mod/TransformControls.mjs'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

import EntityBox from '../entity/EntityBox.vue';
import { ENTITIES } from '../context/EntityComponents.mjs';

const entities = inject('entities');
const renderer = ref();
//const camera = ref();
const transformControls = ref();
const oribtControls = ref();
const scene = ref();
const refBox = ref();
//const enabled = ref(true);
//console.log(TransformControls);

function controlTransform(e){
  console.log(e.code)
  switch ( e.code ) {
    case 'KeyW': // W
      transformControls.value.setMode( 'translate' );
      break;
    case 'KeyE': // E
      transformControls.value.setMode( 'rotate' );
      break;
    case 'KeyR': // R
      transformControls.value.setMode( 'scale' );
      break;
    case 'Escape': // Esc
      //controls.reset(); // nope
      break;
  }
}

function detectTransformHandle ( event ) {
  if(event.value == true){
    oribtControls.value.enabled = false;
  }else{
    oribtControls.value.enabled = true;
  }
}
onMounted(() =>{
  //https://troisjs.github.io/guide/core/raf.html

  console.log("mount editor...")
  //console.log(renderer.value)
  //let render = unref(renderer.value)
  //console.log(render)
  //console.log(renderer.value.renderer.domElement )//ok
  //renderer.value.onBeforeRender(() => {//works
    //console.log("update...")
  //});
  //console.log(unref(renderer).three.cameraCtrl)
  //orbit camera
  oribtControls.value=renderer.value.three.cameraCtrl;
  //Transform Controls
  const controls = new TransformControls(oribtControls.value.object, renderer.value.renderer.domElement)
  transformControls.value=controls;
  transformControls.value.addEventListener('dragging-changed', detectTransformHandle);
  //console.log(refBox.value);
  controls.attach( refBox.value.mesh );
  scene.value.add(controls)
  //console.log(scene.value)
  
  window.addEventListener( 'keydown', controlTransform);
});

onUnmounted(() =>{
  window.removeEventListener( 'keydown', controlTransform);
  transformControls.value.removeEventListener( 'keydown', detectTransformHandle);
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
<template>
  <div class="viewport">
  <Renderer ref="renderer"  resize="div" orbitCtrl >
    <Camera ref="camera" :position="{ z: 10 }" />
    <Scene ref="scene">
      <AmbientLight :intensity="0.1"/>
      <Mesh ref="refBox" />
      <Box >
        <LambertMaterial />
      </Box>
      <!--
      <template v-for="entity in  entities" :key="entity.id">
        <component :is="checkEntityComp(entity)" v-bind="entity" />
      </template>
      -->
    </Scene>
  </Renderer>
  </div>
</template>
<!--
<AmbientLight :intensity="0.1"/>
<PointLight :position="{ y: 50, z: 50 }" />
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