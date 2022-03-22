# Vue Three Editor

# Packages:
- vue
- three
- troisjs
- express
- axios
- vite
- mongoose
- cannon-es

# Information:
  Work In Progress!

  To develop vuejs, Troisjs and threejs editor in module design format.

  Troisjs package reduce time to develop on vuejs components. Looking the Troisjs src code that have easy coding.

# Notes:
- troisjs package can render client only and not SSR server render.
  -  Bug around import and require conflicts from three and troisjs for camera orbit.
- window undefined for ssr

# Set up:
  Need to install nodejs.

```
npm install
npm run devn
```

SSR server prerender (not working with troisjs)
```
npm install
npm run ssrbuild
npm run generate
npm run devs
```
# Troisjs object3d, renderer and scene:
  There are three or more ways to get scene and render for object3D or helper.
```vue
<script setup>
</script>
```
```vue
<script>
export default {
}
</script>
```
```js
import { defineCustomElement } from 'vue'
export default defineCustomElement({
  name: 'Object3D',
  /* component options */
})
```
 As for getting the scene and renderer.
```js
import { RendererInjectionKey, SceneInjectionKey } from 'troisjs'
export default {
  inject:{
      renderer:{from:RendererInjectionKey}
    , scene:{from:SceneInjectionKey}
  },
  mounted() {
    console.log("vuejs default")
    console.log(this.renderer.three)
    console.log(this.renderer.three.renderer.domElement)
    console.log(this.scene)
  }
}
```

```vue
<script setup>
import { RendererInjectionKey, SceneInjectionKey } from 'troisjs'
import {inject, onMounted, onUnmounted} from "vue";
const renderer = inject(RendererInjectionKey);
console.log(renderer)
const scene = inject(SceneInjectionKey);
</script>
```

# Vue Layout:
  Prototype builds. Working toward modular and testing props.

Threejs, Vuejs and Troisjs.
```vue
<script setup>
import { Camera, PointLight, Renderer, Scene } from 'troisjs';
let entity={
    name:"test"
  , position:[0,0,0]
}
</>
<template>
  <Renderer resize="window">
    <Camera :position="{ z: 10 }" />
    <Scene>
      <PointLight :position="{ y: 50, z: 50 }" />
      <EntityBox v-bind="entity" />
    </Scene>
  </Renderer>
</template>
```

EntityBox.vue
```vue
<script setup>
import { Box, LambertMaterial } from 'troisjs';

const props = defineProps({
    name: String
  , visible:Boolean
  , parameters:Object
  , position:Array
  , rotation:Array
  , scale:Array
  , material:Array
})
console.log(props);
const position = props.position || [0,0,0]
</>
<template>
  <Box :position="{ x: position[0],y: position[1],z: position[2] }">
    <LambertMaterial />
  </Box>
</template>
```

# Links:
- https://vuejs.org/
- https://troisjs.github.io
- https://github.com/troisjs/trois
