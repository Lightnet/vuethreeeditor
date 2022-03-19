<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { Box, Camera, LambertMaterial, PointLight, Renderer, Scene } from 'troisjs';
export default {
  inject:['entities'],
  //components: { Box, Camera, LambertMaterial, PointLight, Renderer, Scene },
  components:{},
  methods:{
    clickCreate(event){
      //console.log(event)
      //console.log(this)
      this.$addEntity({
        name:"test"
      });
    },
    clickCLose(event){
      //console.log(event)
      //console.log(this)
      //console.log(this.entities);
    }
  }

};
</script>

<template>
  <div>
    <label> Create </label>

    <button @click="clickCreate"> Create </button>
    <button @click="clickCLose"> CLose </button>
  </div>
</template>

<style>

</style>