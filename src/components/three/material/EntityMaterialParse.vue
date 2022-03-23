<script setup>
import { 
  BasicMaterial 
, LambertMaterial
, MatcapMaterial
, PhongMaterial
, PhysicalMaterial
, ShaderMaterial
, StandardMaterial 
, SubSurfaceMaterial
, ToonMaterial

} from 'troisjs';
const props = defineProps({
  material:Array
})
console.log(props)

</script>
<template>
  <template v-for=" material in props.material" :key="material.index">
    <template v-if="material.dataType=='meshStandardMaterial'">
      <StandardMaterial :color="material.color" :props="{wireframe:material.wireframe}" />
    </template>
  </template>
  <!--
  <StandardMaterial color="white" :props="{wireframe:true}" />
  -->
</template>