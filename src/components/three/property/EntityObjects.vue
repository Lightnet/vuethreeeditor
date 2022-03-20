<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { ref, inject } from "vue";

const deleteEntityID = inject('deleteEntityID');
const entities = inject('entities');
  
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