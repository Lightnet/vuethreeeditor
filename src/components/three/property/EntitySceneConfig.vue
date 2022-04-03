<script setup>

import {
  SceneIDInjectKey,
  SceneNameInjectKey,
  SceneBackGroundColorInjectKey
} from "../context/EntityKeys.mjs";
import { inject } from 'vue';

const sceneID = inject(SceneIDInjectKey)
const sceneName = inject(SceneNameInjectKey)
const sceneBackGroundColor = inject(SceneBackGroundColorInjectKey)

</script>
<template>
  <div>
    <div>
      <label> Scene Config: </label>
    </div>
    <div>
      <label> ID: </label>
      <label> {{sceneID}} </label>
    </div>
    <div>
      <label> Name </label>
      <input type="text" v-model="sceneName"/>
    </div>
    <div>
      <label> Background </label>
      <input type="color" v-model="sceneBackGroundColor"/>
    </div>
  </div>
</template>