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

import  TestAdd from "./TestAdd.mjs";
import  TestChildAdd from "./TestChildAdd.mjs";

const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils;

function onBeforeStep() {

}

function initMesh(iMesh){
  //console.log(iMesh)
  //console.log(iMesh.userData)
  //console.log(iMesh.userData.bodies)
  //console.log(iMesh.userData.body)
  //iMesh.userData.body//nope
  //iMesh.userData.body.position.set(rndFS(2), rnd(5, 7), 0);
  //iMesh.userData.body.angularVelocity.set(0, 0, 0, 0);
  //iMesh.userData.body.velocity.set(0, 0, 0);
  //iMesh.userData.velocity.set(0, 0, 0);
  //iMesh.userData.body.quaternion.set(0, 0, 0, 1);
  iMesh.userData.mass = 1;
}

function initMeshPlane(iMesh){
  //console.log(iMesh)
  //imesh.userData.body//nope
  //iMesh.userData.body.position.set(rndFS(2), rnd(5, 7), 0);
  //iMesh.userData.body.angularVelocity.set(0, 0, 0, 0);
  //iMesh.userData.body.velocity.set(0, 0, 0);
  //iMesh.userData.body.quaternion.set(0, 0, 0, 1);
  iMesh.userData.mass = 0;
}
// resize="window" orbitCtrl 
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
      <TestAdd>
        <TestChildAdd> Test ssss </TestChildAdd>
      </TestAdd>
      <CannonWorld :gravity="{ x: 0, y: -9.82, z: 0 }" @before-step="onBeforeStep">
        <Box @created="initMesh">
          <PhongMaterial color="#ffffff" />
        </Box>
        <Box :position="{ y: -4 }" @created="initMeshPlane">
          <PhongMaterial color="black" />
        </Box>
      </CannonWorld>

    </Scene>
    
      <!--
        <Camera :position="{ z: 10 }" default/>
        <Scene background="white">
      <AmbientLight color="#aaaaaa" />
      <PointLight :position="{ y: 50, z: 50 }" />
      <Plane :width="15" :height="15" :position="{ z: -1 }" receive-shadow>
        <PhongMaterial color="#aaaaaa" />
      </Plane>
      <CannonWorld :gravity="{ x: 0, y: -9.82, z: 0 }" @before-step="onBeforeStep">
        <Box @created="initMesh">
          <PhongMaterial color="#ffffff" />
        </Box>
        <Box :position="{ y: -4 }" @created="initMeshPlane">
          <PhongMaterial color="black" />
        </Box>
      </CannonWorld>
      </Scene>
      -->
      
  </Renderer>
  </div>
</template>