<script>
import { inject } from 'vue';

// normal <script>, executed in module scope (only once)
console.log(this)
// declare additional options
export default {
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const add = inject("add");
const count = inject("count");
</script>

<template>
  <label> Hello Child,{{count}} </label>
  <button @click="add">count+</button>
</template>