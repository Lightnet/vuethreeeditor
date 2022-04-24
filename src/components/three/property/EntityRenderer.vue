<script setup>
// https://troisjs.github.io/guide/core/renderer.html
import {
  EnableOrbitControlInjectKey,
  RenderAlphaInjectKey,
  RenderAntisaliasInjectKey,
  RenderAutoClearInjectKey,
  RenderPointerInjectKey,
  RenderShadowInjectKey,
} from "../context/EntityKeys.mjs";
import { inject, ref } from 'vue';

const isOrbitCtrl = inject(EnableOrbitControlInjectKey)
const isAlpha = inject(RenderAlphaInjectKey)
const isAntialias = inject(RenderAntisaliasInjectKey)
const isAutoClear = inject(RenderAutoClearInjectKey)
const isPointer = inject(RenderPointerInjectKey)
const isShadow = inject(RenderShadowInjectKey)

const isPostProcessing = ref(false)

</script>
<template>
  <div>
    <div>
      <label> Renderer: </label>
    </div>
    <div>
      <label> OrbitCtrl: </label>
      <input type="checkbox" :checked="isOrbitCtrl"  @change="(e)=>isOrbitCtrl=e.target.checked" />
    </div>
    <div>
      <label> Alpha: </label>
      <input type="checkbox" :checked="isAlpha" @change="(e)=>isAlpha=e.target.checked"/>
    </div>
    <div>
      <label> Antialias: </label>
      <input type="checkbox" :checked="isAntialias" @change="(e)=>isAntialias=e.target.checked" />
    </div>
    <div>
      <label> AutoClear: </label>
      <input type="checkbox" :checked="isAutoClear" @change="(e)=>isAutoClear=e.target.checked" />
    </div>
    
    <div>
      <label> Pointer: </label>
      <input type="checkbox" :checked="isPointer" @change="(e)=>isPointer=e.target.checked" />
    </div>
    <div>
      <label> Shadow: </label>
      <input type="checkbox" :checked="isShadow" @change="(e)=>isShadow=e.target.checked" />
    </div>

    <div>
      <div>
        <label> Post Processing: </label>
        <input type="checkbox" :checked="isPostProcessing" @change="(e)=>isPostProcessing=e.target.checked" />
      </div>
      <template v-if="isPostProcessing">
        <div>

        </div>
        <div>
          <label> Type: </label>
          <select>
            <option> </option>
          </select>
          <button> Add </button>
        </div>
      </template>
    </div>
  </div>
</template>