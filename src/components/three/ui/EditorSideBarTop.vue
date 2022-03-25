<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { inject, ref } from "vue";
import { ProjectIDInjectKey, ProjectNameInjectKey, SceneIDInjectKey, SceneNameInjectKey } from "../context/EntityKeys.mjs";
import Modal from "../../modal/Modal.vue";
import EntityAssets from "../property/EntityAssets.vue"

const projectID = inject(ProjectIDInjectKey);
const projectName = inject(ProjectNameInjectKey);
const sceneID = inject(SceneIDInjectKey);
const sceneName = inject(SceneNameInjectKey);

const isShowViewProp = ref(false);

</script>

<template>
  <div class="sidebartop">
    <button>Projects</button>
    <button @click="isShowViewProp = !isShowViewProp">View Props</button>

    <label>[Project ID: {{projectID}}]</label>
    <label>[Project Name: {{projectName}}]</label>
    <label>[Scene ID: {{sceneID}}]</label>
    <label>[Scene Name: {{sceneName}}]</label>
  </div>
  <Modal :isOpen="isShowViewProp" width="700px">
    <EntityAssets/>
  </Modal>
</template>

<style>
.sidebartop {
  position: absolute;
  top:0px;
  left: 0px;
  height: 20px;
  width: 100%;
}
</style>