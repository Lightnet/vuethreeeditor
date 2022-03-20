<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { ref, inject, onMounted, toRef, toRefs, unref } from "vue";
import { ENTITIES } from "../context/EntityComponents.mjs";

const addEntity = inject('addEntity');

//let entities = [];
const entities = ENTITIES;
const selectEntity = ref("box");

const parameters = ref({});
const tmpEntity = ref({});

function clickCreate(event){
  //console.log(event)
  console.log("CREATE?")
  //console.log(this)
  console.log(parameters.value)
  console.log(unref(parameters))
  addEntity({
      name:tmpEntity.value.name
    , isTransform:tmpEntity.value.isTransform
    , dataType:tmpEntity.value.dataType
    , shape:tmpEntity.value.shape
    , mass:tmpEntity.value.mass
    , parameters:unref(parameters)
    , material:tmpEntity.value.material
  });
}
function onSelectEntity(event){
  console.log(event.target.value)
  selectEntity.value=event.target.value
  let entity= entities.find(item=>item.name == event.target.value)
  console.log(entity)
  tmpEntity.value=entity;
  parameters.value = entity.parameters[0];
}

onMounted(()=>{
  //console.log(entities)
  let entity= entities.find(item=>item.name == selectEntity.value)
  tmpEntity.value=entity;
  parameters.value = entity.parameters[0];
})
</script>

<template>
  <div>
    <div>
      <label> Entity </label>
      <select v-model="selectEntity" @change="onSelectEntity">
        <option value=""> Select Entity </option>
        <option v-for="entity in entities" :key="entity.name" :value="entity.name"> {{entity.name}} </option>
      </select>
      <button @click="clickCreate"> Create </button>
    </div>
    <div>
      <label> Entity:{{selectEntity}} </label><br/>
      <template v-if="parameters">
        <label v-for="(value, propertyName) in parameters" :key="propertyName"> {{propertyName}}
          <input :name="propertyName" :value="value" />
        </label>
      </template>
      
    </div>
  </div>
</template>

<style>

</style>