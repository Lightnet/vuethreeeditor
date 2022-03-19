<script setup>
  import { useAttrs } from "vue";

  const attrs = useAttrs();
  console.log(attrs)

  //const props = defineProps({name:String})
  const props = withDefaults(defineProps(),{
    name:"None"
  })

  const emits = defineEmits(["pressed"])

  function getAlert(){
    emits("pressed");
  }

</script>
<template>
  <label>Hello,{{props.name}}</label>
  <button @click="getAlert"> Press </button>
</template>
<style scoped>

</style>
