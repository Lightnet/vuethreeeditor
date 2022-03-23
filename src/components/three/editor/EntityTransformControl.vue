<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://sbcode.net/threejs/transform-controls/
// https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_transform.html
// https://threejs.org/examples/#misc_controls_transform
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import {RendererInjectionKey, SceneInjectionKey, Mesh } from 'troisjs';
import { inject, onMounted, onUnmounted, ref, watch } from 'vue';
/*
export default {
  inject:{
      renderer:{from:RendererInjectionKey}
    , scene:{from:SceneInjectionKey}
  },
  mounted() {
    console.log("EntityTransformControl");
    console.log(this.renderer.three)
    console.log(this.renderer.three.renderer.domElement)
    console.log(this.renderer.three.cameraCtrl)
    console.log(this.renderer.cameraCtrl)
    console.log(this.renderer.camera)
    console.log(this.scene)
    console.log("EntityTransformControl///");
  }
}
*/
const props = defineProps({
  selectObjectID:String
})
const emit = defineEmits(['updateTransform']);
const renderer = inject(RendererInjectionKey);
const scene = inject(SceneInjectionKey);

//watch props changes params
watch(props,()=>{
  if(props.selectObjectID){
    let obj3d = scene.getObjectByProperty('uuid',props.selectObjectID)
    if(obj3d){
      transControls.attach(obj3d);
    }else{
      transControls.detach();
    }
  }
})

const transformControls = ref();
//const refBox = ref();
let transControls;

function detectTransformHandle (event){
  console.log(event);
  //console.log(renderer.three.cameraCtrl)//okay
  renderer.three.cameraCtrl.enabled = !event.value;
  if(event.value==false){
    emit('updateTransform',transformControls.value.mode)
  }
}

//does not work as renderer is not setup yet
onMounted(() => {
  transControls = new TransformControls(renderer.three.camera, renderer.three.renderer.domElement)
  transformControls.value = transControls;
  transformControls.value.addEventListener('dragging-changed', detectTransformHandle);
  //transControls.attach( refBox.value.mesh );
  scene.add(transControls)
  //scene.add(transformControls.value) //nope, error proxy
  window.addEventListener( 'keydown', controlTransform);
})

onUnmounted(() =>{
  transControls.detach();
  scene.remove(transControls)
  transformControls.value.removeEventListener( 'keydown', detectTransformHandle);
  window.removeEventListener( 'keydown', controlTransform);
});

function controlTransform(e){
  console.log(e.code)
  switch ( e.code ) {
    case 'KeyQ': // W
      transformControls.value.setSpace( transformControls.value.space === 'local' ? 'world' : 'local' );
      break;
    case 'KeyW': // W
      transformControls.value.setMode( 'translate' );
      break;
    case 'KeyE': // E
      transformControls.value.setMode( 'rotate' );
      break;
    case 'KeyR': // R
      transformControls.value.setMode( 'scale' );
      break;
    case 'NumpadSubtract': // R
      transformControls.value.setSize( Math.max( transformControls.value.size - 0.1, 0.1 ) );
      break;
    case 'NumpadAdd': // R
      transformControls.value.setSize( transformControls.value.size + 0.1 );
      break;
    case 'Space': // R
      transformControls.value.enabled = ! transformControls.value.enabled;
      break;
    case 'Escape': // Esc
      transformControls.value.reset();
      break;
  }
}
</script>
<template>
  <!--
  <Mesh ref="refBox"/>
  -->
</template>