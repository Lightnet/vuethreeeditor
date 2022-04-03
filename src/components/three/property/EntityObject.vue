<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.codegrepper.com/code-examples/javascript/vue+comparing+two+objects+to+see+if+they+are+the+same

import { ref, inject, watch, unref, toRaw } from "vue";
import { boolean } from "webidl-conversions";
import { EntitiesInjectKey, UpdateEntityInjectKey } from "../context/EntityKeys.mjs";
const isEqual = (...objects) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]));
const entities = inject(EntitiesInjectKey);
const updateEntity = inject(UpdateEntityInjectKey);

const oldEntities = ref([]);

const selectEntity = ref("");
const isRadian = ref(true);
const entity = ref({});

const isTransform = ref(false);
const isParameters = ref(false);
const isMaterial = ref(false);

const materialindex = ref(0);

//check if scene has change to clear entity object
watch(entities,()=>{
  if(isEqual(oldEntities._rawValue, entities._rawValue)==true){
  }else{
    oldEntities.value = entities._rawValue;
    selectEntity.value=""
    entity.value={}
  }
})

function onSelectEntity(event){
  entity.value=null;
  selectEntity.value=event.target.value
  let refEntity= entities.value.find(item=>item.objectid == event.target.value)
  console.log(refEntity)
  if(refEntity){//if found
    entity.value=refEntity;
  }else{//clear if null
    entity.value=null;
  }
}

//function clickEntity(){
  //console.log(entity.value);
  //console.log(entity.value.objectid);
  //console.log(entity.value.name);
  //console.log(entities);
//}

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

function onUpdateMaterial(event){
  console.log(event.target.type);
  console.log(event.target.name);
  console.log(event.target.value);
  //entity.value.parameters[event.target.name]=Number(event.target.value);

  if(event.target.type=="color"){
    entity.value.material[materialindex.value][event.target.name] = String(event.target.value)
  }else if(event.target.type=="text"){
    entity.value.material[materialindex.value][event.target.name] = String(event.target.value)
  }else if(event.target.type=="number"){
    entity.value.material[materialindex.value][event.target.name] = Number(event.target.value)
  }else if(event.target.type=="checkbox"){
    entity.value.material[materialindex.value][event.target.name] = Boolean(event.target.checked)
  }else{
    entity.value.material[materialindex.value][event.target.name] = String(event.target.value)
  }
  
  updateEntity({
      type:"material"
    , objectid: entity.value.objectid
    , value: entity.value.material
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
  if(prop=="skyColor"){
    setType="color";
  }
  if(prop=="groundColor"){
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

function updateIsPhysics(event){

  entity.value.isPhysics = Boolean(event.target.checked)

  updateEntity({
      type:"isPhysics"
    , objectid: entity.value.objectid
    , value: entity.value.isPhysics
  })
}

function updatePhysicsMass(event){
  entity.value.isPhysics = Number(event.target.value)
  updateEntity({
      type:"mass"
    , objectid: entity.value.objectid
    , value: entity.value.mass
  })
}

</script>
<template>
  <!--
  <div>
    <button @click="clickEntity"> Check Entity Obj </button>
  </div>
  -->
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
      <label> Name: {{entity.name}}</label>
    </div>
    <template v-if="(entity.position != null) || (entity.rotation !=null) || (entity.scale != null)">
      <div>
        <label> Transform</label> <button @click="isTransform = !isTransform"> {{isTransform ? "-":"+"}} </button>
      </div>
      <template v-if="isTransform">
      
        <template v-if="entity.position">
          <div>
            <label> Position: </label><br/>
          </div>
          <template v-for="(value, propertyName) in entity.position" :key="propertyName">
            <div>
            <label> {{numToAxe(propertyName)}}</label>
            <input :name="propertyName" :value="value" @change="onUpdatePosition" /><br/>
            </div>
          </template>
        </template>
        <template v-if="entity.rotation">
          <div>
            <div>
              <label> Rotation: </label> <button @click="isRadian = !isRadian">{{isRadian ? "Radian" : "Degree"}} </button> <br/>
            </div>
            <template v-for="(value, propertyName) in entity.rotation" :key="propertyName">
              <div>
              <label> {{numToAxe(propertyName)}}</label>
              <input :name="propertyName" :value="convertRadToDeg(value)" @change="onUpdateRotation" /><br/>
              </div>
            </template>
          </div>
        </template>
        <template v-if="entity.scale">
          <div>
            <label> Scale: </label><br/>
          </div>
          <template v-for="(value, propertyName) in entity.scale" :key="propertyName">
            <div>
              <label> {{numToAxe(propertyName)}}</label>
              <input :name="propertyName" :value="value" @change="onUpdateScale" /><br/>
            </div>
          </template>
        </template>
      </template>

    </template>

    <template v-if="entity.parameters">
      <div>
        <div>
          <label> Parameters: </label> <button @click="isParameters = !isParameters"> {{isParameters ? "-":"+"}} </button> <br/>
        </div>
        <template v-if="isParameters">
          <div>
            <template v-for="(value, propertyName) in entity.parameters" :key="propertyName">
              <div>
                <label> {{propertyName}}</label>
                <input :name="propertyName" :type="checkType(propertyName,value)" :value="value" @change="onUpdateParameters" v-bind="existCheckBox" /><br/>
              </div>
            </template>
          </div>
        </template>
      </div>
    </template>
    
    <template v-if="(typeof entity.isPhysics !== 'undefined')">
      <div>
        <div>
          <label> Physcis: </label>
        </div>
        <div>
          <label> isPhyscis: </label> <input type="checkbox" @change="updateIsPhysics" :checked="entity.isPhysics" />
        </div>
        <div>
          <label> Mass: </label> <input type="number" @change="updatePhysicsMass" v-model="entity.mass" />
        </div>
      </div>
    </template>

    <template v-if="entity.material">
      <div>
        <div>
          <label> Materials: </label> <button @click="isMaterial = !isMaterial"> {{isMaterial ? "-":"+"}} </button> <br/>
        </div>
        <template v-if="isMaterial">
          <div>
            <template v-for="(value, propertyName) in entity.material[materialindex]" :key="propertyName">
              <div>
                <label> {{propertyName}}</label>
                <input :name="propertyName" :type="checkType(propertyName,value)" :value="value" @change="onUpdateMaterial" v-bind="existCheckBox" /><br/>
              </div>
            </template>
          </div>
        </template>
      </div>
    </template>
    
  </template>
</template>

<style>

</style>