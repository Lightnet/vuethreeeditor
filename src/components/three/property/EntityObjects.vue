<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

export default {
  inject:['entities'],
  components: {

  },
  methods:{
    clickDelete(id){
      console.log("delete:", id)
      this.$deleteEntityID(id);
    },
  }

};
</script>

<template>
  <div>
    <label> Entity Objects </label>
    <div v-for="entity in entities" :key="entity.id"> 
      <label> {{entity.name}}</label><button @click="clickDelete(entity.id)">Delete</button>
    </div>
  </div>
</template>

<style>

</style>