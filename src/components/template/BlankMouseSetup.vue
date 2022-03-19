<script setup>
// https://vuejs.org/guide/reusability/composables.html
import { ref, onMounted, onUnmounted } from 'vue'

let name = "John";
const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))

</script>
<template>
  Mouse position is at: {{ x }}, {{ y }}
  <label>Hello,{{name}}</label>
</template>
<style>

</style>
