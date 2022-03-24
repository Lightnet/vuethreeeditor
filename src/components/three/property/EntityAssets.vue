<script setup>
/*

*/
import { ref } from 'vue';
//const emits = defineEmits(['onClose']);
const selectFile = ref(null)
const view = ref("assets");



</script>
<template>
  <template v-if="isOpen">
    <div id="MODAL"  v-bind:style="{position:'absolute',height:height,width:width,zIndex:5}" >
      <div>
        <button @click="onClose"> Close</button>
      </div>
      <div>
        Hell World
      </div>
    </div>
  </template>
</template>