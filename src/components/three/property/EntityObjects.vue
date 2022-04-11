<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { ref, inject } from "vue";
import { 
  EntitiesInjectKey
, DeleteEntityIDInjectKey
, SelectObjectIDInjectKey
, SelectObjectUUIDInjectKey 
, ClearSelectObjectInjectKey
} from "../context/EntityKeys.mjs";

const deleteEntityID = inject(DeleteEntityIDInjectKey);
const entities = inject(EntitiesInjectKey);
const selectObjectID = inject(SelectObjectIDInjectKey);
const clearSelectObject = inject(ClearSelectObjectInjectKey);
  
function clickDelete(id){
  if(selectObjectID.value == id){
    console.log("CLEAR SELECT?>")
    clearSelectObject();
    //selectObjectID.value=""; // clear select object transform control
    //selectObjectUUID.value="";
  }

  //console.log("delete:", id)
  deleteEntityID(id);
  
}
</script>

<template>
  <div>
    <label> Entity Objects </label>
    <div v-for="entity in entities" :key="entity.objectid"> 
      <label> {{entity.name}}</label><button @click="clickDelete(entity.objectid)">Delete</button>
    </div>
  </div>
</template>

<style>

</style>