<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet

  Information: Testing three cannon

  Note it old cannon npm outdate.
  "cannon": "^0.6.2",

*/

// https://vuedose.tips/going-3d-with-trois-js-and-vue-3/
// https://troisjs.github.io/guide/lights/
import { Box, PerspectiveCamera,Camera, LambertMaterial, PointLight, Renderer, Scene, Plane, AmbientLight, PhongMaterial } from 'troisjs';
//const { Box, Camera, LambertMaterial, PointLight, Renderer, Scene } = await import('troisjs');
import { Color, MathUtils, Object3D } from 'three';
//import CannonWorld from 'troisjs/src/components/physics/CannonWorld.js';
import CannonWorld from '../physics/CannonWorld.mjs';

const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils;

function onBeforeStep(cannon) {
  //console.log(cannon);
}

const GROUP1 = 1;
const GROUP2 = 2;
const GROUP3 = 4;

function initMesh(iMesh){
  iMesh.userData.mass = 1;
  iMesh.userData.collisionFilterGroup = GROUP1;
  iMesh.userData.collisionFilterMask = GROUP3;
}

function initMeshPlane(iMesh){
  iMesh.userData.mass = 0;
  iMesh.userData.test="text"
  iMesh.userData.collisionFilterGroup = GROUP3;
  iMesh.userData.collisionFilterMask = GROUP1;
}

function initMeshTrigger(iMesh){
  //console.log(iMesh)
  iMesh.userData.mass = 0;
  iMesh.userData.collisionFilterGroup = GROUP3;
  iMesh.userData.collisionFilterMask = GROUP1;
  iMesh.userData.shapeType="Box";
  iMesh.userData.isTrigger=true;
  iMesh.userData.onCollide=function(event){
    console.log("collide?")
  }
  //console.log(iMesh.userData)
  console.log("iMesh.userData.body")
  console.log(iMesh.userData.body)
}

</script>
<template>
  <div>
  <Renderer resize="window" orbit-ctrl>
    <Scene>
      <Camera :position="{ z: 10 }" default/>
      <AmbientLight color="#aaaaaa" />
      <PointLight :position="{ y: 50, z: 50 }" />
      <Plane :width="15" :height="15" :position="{ z: -1 }" receive-shadow>
        <PhongMaterial color="#aaaaaa" />
      </Plane>
      <CannonWorld :gravity="{ x: 0, y: -9.82, z: 0 }" @before-step="onBeforeStep">
        <Box @created="initMesh" :position="{ x: 0, y: 10, z: 0 }">
          <PhongMaterial color="#ffffff" />
        </Box>

        <Box @created="initMeshTrigger">
          <PhongMaterial color="#ffffff" />
        </Box>

        <Box :position="{ y: -4 }" @created="initMeshPlane">
          <PhongMaterial color="black" />
        </Box>
      </CannonWorld>

    </Scene>
    
  </Renderer>
  </div>
</template>