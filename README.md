# Vue Three Editor

# Status:
  - stable and some bugs.
  - simple set up editor
  - loading different scene with different entities does not update the UI.

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

# Features:
- Simple account
- Docs (work in progress)
  - entity setup prefab
  - 
- Editor
  - debug
    - lights helper not added
    - camera helper not added
  - tools
    - transform controls
      - select object to display the helper transform
      - default key from three.js transformcontrol
      - Not all geometry work as only box and plane is added.
  - project
    - project list ( added )
    - delete ( added )
    - create ( added )
    - edit ( added )
  - scene ( added )
    - scene list ( added )
    - delete ( not added )
    - update ( not added )
    - create ( not added )
    - load ( added )
      -  bugs objects load not clear data.
  - entity
    - save ( added )
    - load ( added )
    - update ( added )
    - delete ( added )
  - Physics ( work in progress )
    - simple cube fall
  - express ( added )
    - access ( added )
    - entity objects ( added )
    - project ( added )
    - scene ( added )
    - files ( not added )
  - material ( added )
    - simple geometry color and wireframe
  - geometry
    - box ( added )
    - plane ( added )
  - lights ( added )
    - Tested basic lights and working some need target object or vector to work.


# Notes:
- transform controls ray overlay not select mesh due to plane select first and cube.
- transform control and input transform ui does not update correctly
- troisjs package can render client only and not SSR server render.
  -  Bug around import and require conflicts from three and troisjs for camera orbit.
- window undefined for ssr
- script setup user create object mount inject renderer doesn't load correctly.
  - one reason is orbit camera is null
    -  work when doing some event handle as render update variables.
```vue
<script>
export default {
  inject:{
      renderer:{from:RendererInjectionKey}
    , scene:{from:SceneInjectionKey}
  },
  mounted() {
    console.log("EntityTransformControl");
    console.log(this.renderer.three)
    console.log(this.renderer.three.renderer.domElement)
    console.log(this.scene)
  }
}
</script>
```

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
