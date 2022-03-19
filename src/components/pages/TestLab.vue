<script setup>
  import HelloWorld from "../template/HelloWorld.vue"
  import HelloWorldProps from "../template/HelloWorldProps.vue"
  import BlankMouseSetup from "../template/BlankMouseSetup.vue"
  import EntityBox from "../three/entity/EntityBox.vue"

  let name="TestMax";

  function pressed(){
    console.log("Hello press function")
  }

  let entity={
      name:"test"
    , position:[0,0,0]
  }
  // v-bind="entity"
</script>


<template>
  <EntityBox v-bind="entity" />
</template>
<!-- 
<EntityBox name="test" />
<BlankMouseSetup/>
<HelloWorldProps @pressed="pressed" />
<HelloWorldProps :name="name"/>
<HelloWorld />
-->
<style scoped>

</style>
