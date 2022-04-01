



https://pmndrs.github.io/cannon-es/docs/classes/Body.html


https://pmndrs.github.io/cannon-es/docs/classes/Shape.html#body





# Cannon set setup:
Need to add useCannon to set up event, collision filter.

Code need to custom setting in userData={} but there is object3D setup for components.

Since it not init from 
```js
function initMeshTrigger(iMesh){
  //console.log(iMesh)
  iMesh.userData.mass = 0;
  iMesh.userData.isTrigger=true;
  iMesh.userData.onCollide=function(event){
    console.log("collide?")
  }
}

<Renderer resize="window" orbit-ctrl>
<Scene>
<CannonWorld :gravity="{ x: 0, y: -9.82, z: 0 }" @before-step="onBeforeStep">
<Box @created="initMesh" :position="{ x: 0, y: 10, z: 0 }">
  <PhongMaterial color="#ffffff" />
</Box>
</CannonWorld>
</Scene>
</Renderer>
```

Come from troisjs Object3D
```js
//...

initObject3D(o3d: Object3D) {
  //...
  this.$emit('created', o3d)
  //...
}
//...
```

- https://pmndrs.github.io/cannon-es/docs/classes/Body.html#collisionFilterGroup
- https://github.com/pmndrs/cannon-es/blob/master/examples/collision_filter.html

```
collisionFilterGroup default 1
collisionFilterMask default -1
```

```js
// Collision filter groups - must be powers of 2!
const GROUP1 = 1
const GROUP2 = 2
const GROUP3 = 4

const sphereBody = new CANNON.Body({
collisionFilterGroup: GROUP1, // Put the sphere in group 1
  collisionFilterMask: GROUP2 | GROUP3, // It can only collide with group 2 and 3
})
```

https://github.com/schteppe/cannon.js/blob/master/tools/threejs/CannonDebugRenderer.js






https://github.com/troisjs/troisjs.github.io/blob/master/src/components/physics/Demo1.vue


CannonWorld


https://www.npmjs.com/package/cannon-es



https://pmndrs.github.io/cannon-es/


