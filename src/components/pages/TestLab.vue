<script setup>
  import HelloWorld from "../template/HelloWorld.vue"
  import HelloWorldProps from "../template/HelloWorldProps.vue"

  let name="TestMax";

  function pressed(){
    console.log("Hello press function")
  }

</script>


<template>
  
  
  <HelloWorldProps @pressed="pressed" />
</template>
<!-- 
  <HelloWorldProps :name="name"/>
  <HelloWorld />
-->
<style scoped>

</style>
