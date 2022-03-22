<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import {inject} from "vue";
const projectID = inject('projectID');
const projectName = inject('projectName');
const sceneID = inject('sceneID');
const sceneName = inject('sceneName');

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