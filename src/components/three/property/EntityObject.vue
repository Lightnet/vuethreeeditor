<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { ref, inject, unref } from "vue";

const entities = inject('entities');
const updateEntity = inject('updateEntity');

const selectEntity = ref("");
const isRadian = ref(true);
const entity = ref({});

function onSelectEntity(event){
  entity.value=null;

  console.log(event.target.value)
  selectEntity.value=event.target.value
  let refEntity= entities.value.find(item=>item.objectid == event.target.value)
  if(refEntity){//if found
    console.log(refEntity)
    entity.value=refEntity;
  }else{//clear if null
    entity.value=null;
  }
}

function clickEntity(){
  //console.log(entity.value);
  //console.log(entity.value.objectid);
  //console.log(entity.value.name);
  console.log(entities);
}

function onUpdatePosition(event){
  //console.log(event.target.type);
  console.log("name",event.target.name);
  console.log("value",event.target.value);
  console.log("id",entity.value.objectid)
  entity.value.position[event.target.name]=Number(event.target.value);
  updateEntity({
      type:"position"
    , objectid: entity.value.objectid
    , value: entity.value.position
  })
}

function onUpdateRotation(event){
  console.log(event.target.type);
  console.log(event.target.name);
  console.log(event.target.value);
  let val = event.target.value
  if(!isRadian.value){
    val = val * (Math.PI/180)
  }
  entity.value.rotation[event.target.name]=Number(val);
  updateEntity({
      type:"rotation"
    , objectid: entity.value.objectid
    , value: entity.value.rotation
  })
}

function convertRadToDeg(val){
  if(!isRadian.value){
    val = val *  180 / Math.PI;
  }
  return val;
}

function numToAxe(val){
  if(val==0){
    return "X"
  }
  if(val==1){
    return "Y"
  }
  if(val==2){
    return "Z"
  }
}

function onUpdateScale(event){
  console.log(event.target.type);
  console.log(event.target.name);
  console.log(event.target.value);
  entity.value.scale[event.target.name]=Number(event.target.value);
  updateEntity({
      type:"scale"
    , objectid: entity.value.objectid
    , value: entity.value.scale
  })
}

function onUpdateParameters(event){
  console.log(event.target.type);
  console.log(event.target.name);
  console.log(event.target.value);
  //entity.value.parameters[event.target.name]=Number(event.target.value);

  if(event.target.type=="color"){
    entity.value.parameters[event.target.name] = String(event.target.value)
  }else if(event.target.type=="text"){
    entity.value.parameters[event.target.name] = String(event.target.value)
  }else if(event.target.type=="number"){
    entity.value.parameters[event.target.name] = Number(event.target.value)
  }else if(event.target.type=="checkbox"){
    entity.value.parameters[event.target.name] = Boolean(event.target.checked)
  }else{
    entity.value.parameters[event.target.name] = String(event.target.value)
  }
  
  updateEntity({
      type:"parameters"
    , objectid: entity.value.objectid
    , value: entity.value.parameters
  })
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

</script>

<template>
  <div>
    <button @click="clickEntity"> Check Entity Obj </button>
  </div>
  <div>
    <label> Entity </label>
    <select v-model="selectEntity" @change="onSelectEntity">
      <option value=""> Select Entity </option>
      <option v-for="entity in entities" :key="entity.objectid" :value="entity.objectid"> {{entity.name}} </option>
    </select>
  </div>
  <template v-if="entity">
    <div>
      <label> Entity ID: {{entity.objectid}}</label>
    </div>
    <div>
      <template v-if="entity.position">
        <label> Position: </label><br/>
        <template v-for="(value, propertyName) in entity.position" :key="propertyName">
          <label> {{numToAxe(propertyName)}}</label>
          <input :name="propertyName" :value="value" @change="onUpdatePosition" /><br/>
        </template>
      </template>
    </div>

    <div>
      <template v-if="entity.rotation">
        <label> Rotation: </label> <button @click="isRadian = !isRadian">{{isRadian ? "Radian" : "Degree"}} </button> <br/>
        <template v-for="(value, propertyName) in entity.rotation" :key="propertyName">
          <label> {{numToAxe(propertyName)}}</label>
          <input :name="propertyName" :value="convertRadToDeg(value)" @change="onUpdateRotation" /><br/>
        </template>
      </template>
    </div>

    <div>
      <template v-if="entity.scale">
        <label> Scale: </label><br/>
        <template v-for="(value, propertyName) in entity.scale" :key="propertyName">
          <label> {{numToAxe(propertyName)}}</label>
          <input :name="propertyName" :value="value" @change="onUpdateScale" /><br/>
        </template>
      </template>
    </div>

    <div>
      <template v-if="entity.parameters">
        <label> Parameters: </label><br/>
        <template v-for="(value, propertyName) in entity.parameters" :key="propertyName">
          <label> {{propertyName}}</label>
          <input :name="propertyName" :type="checkType(propertyName,value)" :value="value" @change="onUpdateParameters" v-bind="existCheckBox" /><br/>
        </template>
      </template>
    </div>

  </template>
</template>

<style>

</style>