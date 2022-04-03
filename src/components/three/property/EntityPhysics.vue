<script setup>
//
import {
  GravityPhysicsInjectKey
, EnablePhysicsInjectKey
, EnablePhysicsPauseInjectKey
} from "../context/EntityKeys.mjs";
import { inject } from 'vue';


const gravity = inject(GravityPhysicsInjectKey);
const enablePhysics = inject(EnablePhysicsInjectKey);
const enablePhysicsPause = inject(EnablePhysicsPauseInjectKey);

function inputGravity(event){
  console.log("event.target.type")
  console.log(event.target.type)
  console.log(event.target.name)
  console.log(event.target.value)
  console.log(typeof event.target.value)
  gravity.value[event.target.name] = Number(event.target.value)
}

function changeEnablePhysics(event){
  enablePhysics.value = event.target.checked;
}

function changeEnablePhysicsPause(event){
  enablePhysicsPause.value = event.target.checked;
}

</script>
<template>
  <div>
    <div>
      <label> Physics </label>
    </div>
    <div>
      <label> X: </label>
      <input type="number" name="0" v-model="gravity[0]" @change="inputGravity" >
    </div>
    <div>
      <label> Y: </label>
      <input type="number" name="1" v-model="gravity[1]" @change="inputGravity" >
    </div>
    <div>
      <label> Z: </label>
      <input type="number" name="2" v-model="gravity[2]" @change="inputGravity" >
    </div>
    <div>
      <label> Enable Physics: </label>
      <input type="checkbox" :checked="enablePhysics" @change="changeEnablePhysics">
    </div>
    <div>
      <label> Pause Physics: </label>
      <input type="checkbox" :checked="enablePhysicsPause" @change="changeEnablePhysicsPause">
    </div>

  </div>
</template>