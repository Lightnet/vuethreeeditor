<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://vuejs.org/guide/built-ins/teleport.html#basic-usage
// https://dev.to/mandrewcito/vue-js-draggable-div-3mee
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { getCurrentInstance } from 'vue';

const app = getCurrentInstance()
const props = defineProps({
  isOpen:Boolean,
  width:String,
  height:String
});
console.log(props)
const isOpen = ref(props.isOpen ? true : false)
watch(props,()=>{
  if(typeof props.isOpen === 'boolean'){
    isOpen.value =props.isOpen;
  }
})
//console.log(isOpen.value)
const emits = defineEmits(['onClose']);
const width = ref(props.width || "200px")
const height = ref( props.height || "200px")
const modal = ref()
const modalDrag = ref()
const positions = reactive({clientX:0,clientY:0,movementX:0,movementY:0,})

function onClose(){
  //console.log(isOpen.value);
  isOpen.value=false;
}

function dragMouseDown(event) {
  event.preventDefault()
  // get the mouse cursor position at startup:
  positions.clientX = event.clientX
  positions.clientY = event.clientY
  document.onmousemove = elementDrag
  document.onmouseup = closeDragElement
}

function elementDrag(event) {
  event.preventDefault()
  positions.movementX = positions.clientX - event.clientX
  positions.movementY = positions.clientY - event.clientY
  positions.clientX = event.clientX
  positions.clientY = event.clientY
  // set the element's new position:
  modal.value.style.top = (modal.value.offsetTop - positions.movementY) + 'px'
  modal.value.style.left = (modal.value.offsetLeft - positions.movementX) + 'px'
}

function closeDragElement(){
  document.onmouseup = null
  document.onmousemove = null
}

</script>
<template>
  <Teleport to="body">
    <template v-if="isOpen">
      <div ref="modal" id="MODAL" v-bind:style="{position:'absolute',left:'0px',top:'0px',backgroundColor:'white',height:height,width:width,zIndex:5}" >
        <div ref="modalDrag" style="backgroundColor:darkgray;" @mousedown="dragMouseDown">
          <button @click="onClose"> Close</button>
        </div>
        <div>
          <slot></slot>
        </div>
      </div>
    </template>
  </Teleport>
</template>
<!--
Hello World! <button @click="clickTest"> Test Root </button>

-->