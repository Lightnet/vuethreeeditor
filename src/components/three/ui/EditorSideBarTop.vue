<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import {inject} from "vue";
import { ProjectIDInjectKey, ProjectNameInjectKey, SceneIDInjectKey, SceneNameInjectKey } from "../context/EntityKeys.mjs";

const projectID = inject(ProjectIDInjectKey);
const projectName = inject(ProjectNameInjectKey);
const sceneID = inject(SceneIDInjectKey);
const sceneName = inject(SceneNameInjectKey);

</script>

<template>
  <div class="sidebartop">
    <label>Projects</label>

    <label>[Project ID: {{projectID}}]</label>
    <label>[Project Name: {{projectName}}]</label>
    <label>[Scene ID: {{sceneID}}]</label>
    <label>[Scene Name: {{sceneName}}]</label>
  </div>
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