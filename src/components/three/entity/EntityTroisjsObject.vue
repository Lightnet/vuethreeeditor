<script setup>
// https://github.com/troisjs/trois/blob/master/src/core/Scene.ts
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
import { RendererInjectionKey, SceneInjectionKey } from 'troisjs'
import {inject, onMounted, onUnmounted} from "vue";
const renderer = inject(RendererInjectionKey);
console.log(renderer)
const scene = inject(SceneInjectionKey);
console.log(scene)
let box;
onMounted(()=>{
  const geometry =new BoxGeometry(1,1,1);
  const material = new MeshBasicMaterial( {color: 0x00ff00} );
  box = new Mesh(geometry, material )
  scene.add( box );
})
onUnmounted(()=>{
  scene.remove( box );
})
</script>
<template>
</template>
