<script setup>
import { ref, provide, reactive, toRaw } from "vue";
import BlankChildSetup from "./BlankChildSetup.vue"

const foo = {text:"test"}
const reactiveFoo = reactive(foo)
const refFoo = ref(foo)

console.log(toRaw(reactiveFoo) === foo) // true
console.log(toRaw(refFoo.value) === foo) // true
console.log(toRaw(refFoo) === foo) // false
console.log(reactiveFoo === foo) // false

console.log(toRaw(refFoo.value))

// provide static value
provide('foo', 'bar')

// provide reactive value
const count = ref(0)
provide('count', count)

function add(){
  count.value++;
}
provide('add', add)

</script>
<template>
  <BlankChildSetup/>
  <label> {{count}} </label>
</template>