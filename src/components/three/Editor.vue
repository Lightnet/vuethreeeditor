<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import EditorSideBarTop from "./ui/EditorSideBarTop.vue";
import EditorSideBarRight from "./ui/EditorSideBarRight.vue";
import EditorSideBarLeft from "./ui/EditorSideBarLeft.vue";
import EditorViewport3D from "./ui/EditorViewport3D.vue";
const props = defineProps({
  projectID:String
});
console.log(props)

onMounted(() => {
  console.log("editor mount!")
})


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
  top:0px;
  left: 0px;
}
</style>