<script setup>
import { inject } from 'vue';
import Notification from '../notify/Notification.vue';
  
//import HelloWorldProps from "../template/BlankProps.vue"
//import BlankMouseSetup from "../template/BlankMouseSetup.vue"
//import BlankParentSetup from "../template/BlankParentSetup.vue"

const notify = inject('notify');
const notifies = inject('notifies')

function pressed(){
  console.log("Hello press function")
}

let entity={
    name:"test"
  , position:[0,0,0]
}

function onDelete(){
  console.log("delete")
}

function clickInfo(){
  notify({
    type:"info",
    header:"Test",
    text:"Hello World Info!"
  })
}

function clickSuccess(){
  notify({
    type:"success",
    header:"Test",
    text:"Hello World Info!"
  })
}

function clickError(){
  notify({
    type:"error",
    header:"Test",
    text:"Hello World Info!"
  })
}

function clickWarning(){
  notify({
    type:"warning",
    header:"Test",
    text:"Hello World Info!"
  })
}

function clickNotifys(){
  console.log(notifies)
}

</script>
<template>
  <button @click="clickInfo"> Info </button>
  <button @click="clickSuccess"> success </button>
  <button @click="clickError"> error </button>
  <button @click="clickWarning"> warning </button>
  <button @click="clickNotifys"> clickNotifys </button>
</template>
<!-- 
<HelloWorldProps :name="'test'"/>
<BlankParentSetup  />
<BlankMouseSetup/>
<HelloWorldProps @pressed="pressed" />
<HelloWorldProps :name="name"/>
<HelloWorld />
-->
<style>

</style>
