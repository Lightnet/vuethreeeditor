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
  console.log(parameters)
  console.log(unref(parameters))
  addEntity({
      name:tmpEntity.value.name
    , isTransform:tmpEntity.value.isTransform
    , dataType:tmpEntity.value.dataType
    , shape:tmpEntity.value.shape
    , mass:tmpEntity.value.mass
    //, parameters:unref(parameters)
    //, parameters:parameters._rawValue
    , parameters:JSON.parse(JSON.stringify(parameters.value))
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

function checkType(prop,value){
  let setType="text";
  if(typeof value=="number"){
    setType="number"
  }
  if (typeof value=="boolean"){
    setType="checkbox"
  }
  if(prop=="color"){
    setType="color";
  }
  return setType;
}

function existCheckBox(prop,value){
  let setType=null;
  if (typeof value=="boolean"){
    setType="checkbox"
  }
  if(setType){
    return {
      checked:value
    }
  }else{
    return {}
  }
}

onMounted(()=>{
  //console.log(entities)
  let entity= entities.find(item=>item.name == selectEntity.value)
  tmpEntity.value=entity;
  parameters.value = entity.parameters[0];
})

function updateParameters(event){
  console.log(event.target.name)
  console.log(event.target.type)
  if(event.target.type=="color"){
    parameters.value[event.target.name] = String(event.target.value)
  }else if(event.target.type=="text"){
    parameters.value[event.target.name] = String(event.target.value)
  }else if(event.target.type=="number"){
    parameters.value[event.target.name] = Number(event.target.value)
  }else if(event.target.type=="checkbox"){
    parameters.value[event.target.name] = Boolean(event.target.checked)
  }else{
    parameters.value[event.target.name] = String(event.target.value)
  }
}

function checkParams(){
  console.log(parameters.value);
}
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
        <template v-for="(value, propertyName) in parameters" :key="propertyName">
        <label > {{propertyName}}</label>
        <input :name="propertyName" :type="checkType(propertyName,value)" v-bind="existCheckBox" :value="value" @change="updateParameters" /><br/>
        </template>
        <button @click="checkParams"> Check Params </button>
      </template>
      
    </div>
  </div>
</template>

<style>

</style>