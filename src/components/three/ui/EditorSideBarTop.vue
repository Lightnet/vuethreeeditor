<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { inject, ref } from "vue";
import { 
  ProjectIDInjectKey
, ProjectNameInjectKey
, SceneIDInjectKey
, SceneNameInjectKey 
, EnablePhysicsInjectKey
, EnablePauseInjectKey
, GravityPhysicsInjectKey
} from "../context/EntityKeys.mjs";
import Modal from "../../modal/Modal.vue";
import EntityAssets from "../property/EntityAssets.vue"

const projectID = inject(ProjectIDInjectKey);
const projectName = inject(ProjectNameInjectKey);
const sceneID = inject(SceneIDInjectKey);
const sceneName = inject(SceneNameInjectKey);

const isPhysics = inject(EnablePhysicsInjectKey);
const isPause = inject(EnablePauseInjectKey);
const gravity = inject(GravityPhysicsInjectKey);

const isShowViewProp = ref(false);

function togglePlay(){

}
function togglePhysics(){
  isPhysics.value = !isPhysics.value;
}

function togglePause(){
  isPause.value = !isPause.value;
}
//<label>[Project ID: {{projectID}}]</label>
//<label>[Scene ID: {{sceneID}}]</label>
</script>
<template>
  <div class="sidebartop">
    <button>Projects</button>
    <button>Project</button>
    <button @click="isShowViewProp = !isShowViewProp">View Props</button>

    <button @click="togglePhysics">Physics {{isPhysics ? "true": "false"}}</button>
    <button @click="togglePlay">Play</button>
    <button @click="togglePause">Pause {{isPause ? "true": "false"}}</button>
    <label>[Project Name: {{projectName}}]</label>
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