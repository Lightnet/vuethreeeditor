<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { onMounted } from "vue"
import EditorSideBarTop from "./ui/EditorSideBarTop.vue";
import EditorSideBarRight from "./ui/EditorSideBarRight.vue";
import EditorSideBarLeft from "./ui/EditorSideBarLeft.vue";
import EditorViewport3D from "./ui/EditorViewport3D.vue";
const props = defineProps({
  projectid:String
});
console.log(props)
console.log("Editor onMount!",props.projectid)
//onMounted(() => {
  //console.log(props.projectid)
  //console.log(typeof props.projectid)
  //console.log("Editor onMount!",props.projectid)
//})

</script>
<template>

  <div class="editor">
    <EditorSideBarTop/>
    <EditorSideBarLeft/>
    <EditorSideBarRight/>
    <EditorViewport3D/>
  </div>
</template>

<style scoped>
.editor {
  position: fixed;
  height:100%;
  width:100%;
  top:0px;
  left: 0px;
}
</style>