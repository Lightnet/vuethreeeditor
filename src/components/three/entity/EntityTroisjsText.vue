<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet

  Information: Testing getting renderer, scene and create box.

*/

// https://github.com/troisjs/trois/blob/master/src/core/Scene.ts

import { RendererInjectionKey, SceneInjectionKey } from 'troisjs'
import {inject, onMounted, onUnmounted} from "vue";
import { Text } from 'troika-three-text';
const renderer = inject(RendererInjectionKey);
console.log(renderer)
const scene = inject(SceneInjectionKey);
console.log(scene)
const myText = new Text()
onMounted(()=>{
  scene.add( myText );
  // Set properties to configure:
  myText.text = 'Hello world!'
  myText.fontSize = 0.2
  myText.position.z = -2
  myText.color = 0x9966FF

})
onUnmounted(()=>{
  scene.remove( myText );
  myText.dispose()
})
</script>
<template>
</template>
