# Vue Three Editor

# Information:
  Work In Progress!

  To develop vuejs threejs editor in module design format.

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
# Vue Layout:
  Prototype builds. Working toward modular and testing props.

render.vue
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

# Links:
- https://vuejs.org/
- https://troisjs.github.io
- https://github.com/troisjs/trois
