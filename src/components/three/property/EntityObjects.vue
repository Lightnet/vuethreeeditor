<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { ref, inject } from "vue";
import { EntitiesInjectKey, DeleteEntityIDInjectKey } from "../context/EntityKeys.mjs";

const deleteEntityID = inject(DeleteEntityIDInjectKey);
const entities = inject(EntitiesInjectKey);
  
function clickDelete(id){
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