<script setup>
  
import HelloWorldProps from "../template/BlankProps.vue"
import BlankMouseSetup from "../template/BlankMouseSetup.vue"

import BlankParentSetup from "../template/BlankParentSetup.vue"

let name="TestMax";

function pressed(){
  console.log("Hello press function")
}

let entity={
    name:"test"
  , position:[0,0,0]
}
</script>
<template>
  <HelloWorldProps :name="'test'"/>
  <BlankParentSetup  />
</template>
<!-- 

<BlankMouseSetup/>
<HelloWorldProps @pressed="pressed" />
<HelloWorldProps :name="name"/>
<HelloWorld />
-->
<style scoped>

</style>
