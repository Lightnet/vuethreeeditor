<script setup>
// https://blog.ninja-squad.com/2021/09/30/script-setup-syntax-in-vue-3/
import { useAttrs, ref, onMounted, onUnmounted, computed, defineProps } from "vue";

//const attrs = useAttrs();//class style
//console.log(attrs)
//const x = ref(0)
//const y = ref(0)
//onMounted(() => {})
//onUnmounted(() => {})
//const props = withDefaults(defineProps(),{ //typescript
  //name:"None"
//})
const props = defineProps({
  name:String
})

console.log(props.name)
//const emits = defineEmits(["pressed"])
//function getAlert(){
  //emits("pressed");
//}
let name = "John";

</script>
<template>
  <label>Hello,{{props.name}}</label><br/>
  <label>Hello,{{name}}</label><br/>
  <button @click="getAlert"> Press </button><br/>
</template>
<style scoped>

</style>
