# troisjs

## Notes:
  Took time to learn some set up for troisjs.

# Information:
  By using the Renderer, Scene and Symbol Keys.

  It not recommand for use for proxy that vuejs build for as it can slow down three render as it is from ref() function.

  When creating the object3d. You need to call upon the scene root access variable. Read the docs on vuejs for help.

  https://vuejs.org/guide/components/provide-inject.html#prop-drilling

  There are couple of way of calling the scene or renderer variables. From Provide => inject but the renderer need to top level element to access the variables.

```vue
<template>
  <CustomMesh-does-not-work-here>
  <Renderer>
    <Scene>
      <Camera :position="{ z: 10 }" />
      <PointLight :position="{ y: 50, z: 50 }" />
      <CustomMesh--work-here>
      <CustomMesh>
      <Box :position="{ y: -2, z: -1 }">
        <LambertMaterial />
      </Box>
    </Scene>
  </Renderer>
</template>
```

  Here example how to set up render and scene for root access variable.

## Method #1
```vue
<script setup>
import { ref, onMounted } from 'vue';
import { Box, Camera, LambertMaterial, PointLight, Renderer, Scene, Text, Sprite } from 'troisjs';

const renderer = ref();

onMounted(() =>{
  console.log("renderer")
  console.log(renderer.value.three.renderer.domElement)
});
</script>
<template>
  <Renderer ref="renderer" resize="window" orbitCtrl>
    <Scene>
      <Camera :position="{ z: 10 }" />
      <PointLight :position="{ y: 50, z: 50 }" />
      <Box :position="{ y: -2, z: -1 }">
        <LambertMaterial />
      </Box>
    </Scene>
  </Renderer>
</template>
```

## Method #2
```vue
<script>
import { Box, Camera, LambertMaterial, PointLight, Renderer, Scene, Text, Sprite } from 'troisjs';
export default {
  components:{
    Renderer,
    Camera,
    PointLight,
    Box,
    LambertMaterial,
    Scene,
  },
  mounted() {
    const renderer = this.$refs.renderer;
    console.log("renderer")
    console.log(renderer)
    console.log(renderer.three.renderer.domElement)
    //var container = document.getElementById('viewport'); // 'mastheadBackground' is my header id
    //console.log(container)
    //console.log("container")
    //container.appendChild(renderer.three.renderer.domElement);
    const box = this.$refs.box.mesh;
    renderer.onBeforeRender(() => {
      box.rotation.x += 0.01;
    });
    
  },
};
//<div id="viewport" style="height:100%;width:100%;"></div>
</script>
<template>
  <Renderer ref="renderer">
    <Camera :position="{ z: 10 }" />
    <Scene>
      <PointLight :position="{ y: 50, z: 50 }" />
      <Box ref="box" :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }">
        <LambertMaterial />
      </Box>
    </Scene>
  </Renderer>
</template>
```
# create your own object3d or helper:
  To access to scene or render by using the inject call.

vuejs script setup
```vue
<script setup>
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
  scene.add( box );//add box to scene
})
onUnmounted(()=>{
  scene.remove( box ); //remove box to scene
})
</script>
```
vuejs export default
```vue
<script>
// https://github.com/troisjs/trois/blob/master/src/core/Scene.ts
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
import { RendererInjectionKey, SceneInjectionKey } from 'troisjs'

export default {
  inject:{
      renderer:{from:RendererInjectionKey}
    , scene:{from:SceneInjectionKey}
  },
  data() {
    return {
      
    }
  },
  mounted() {
    console.log("vuejs default")
    console.log(this.renderer.three)
    console.log(this.renderer.three.renderer.domElement)
    console.log(this.scene)
  }
}
</script>
<template>
</template>
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
</script>
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
</script>
<template>
  <Box :position="{ x: position[0],y: position[1],z: position[2] }">
    <LambertMaterial />
  </Box>
</template>
```





- https://github.com/troisjs/trois/blob/master/src/plugin.ts
  - List of component and object3d


https://github.com/troisjs/trois/tree/master/src/meshes

Box.ts

https://github.com/troisjs/trois/blob/master/src/core/Object3D.ts

```vue
<script setup>
import {inject} from "vue";
//provide
import { RendererInjectionKey, SceneInjectionKey } from 'troisjs'
//inject
const renderer = inject(RendererInjectionKey);
console.log(renderer)

const scene = inject(SceneInjectionKey);
console.log(scene)

</script>
```


```vue
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
```

```
```

```
```

```
```