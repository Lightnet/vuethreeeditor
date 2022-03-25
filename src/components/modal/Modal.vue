<script setup>
/*

*/

// https://vuejs.org/guide/built-ins/teleport.html#basic-usage
// https://dev.to/mandrewcito/vue-js-draggable-div-3mee
import { inject, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { getCurrentInstance } from 'vue';
import { useEmit } from "../event/eventBusPlugin.mjs";

const app = getCurrentInstance()
//console.log("app.appContext");
//console.log(app.appContext);

//const EventBus = inject('EventBus');
//EventBus.emit('test')
//app.on('test',()=>{
  //console.log("FOO!")
//})
const vemit = useEmit();

const props = defineProps({
  isOpen:Boolean,
  width:String,
  height:String
});
//console.log(props)

watch(props,()=>{
  if(typeof props.isOpen !== 'undefined'){
    isOpen.value =props.isOpen;
  }
})

//app.emit('test')
//app.appContext.emit('test')//nope

const emits = defineEmits(['onClose']);
const width = ref(props.width || "200px")
console.log("width///")
console.log(width)
const height = ref( props.height || "200px")
const isOpen = ref(props.isOpen || true)

const modal = ref()
const modalDrag = ref()

const positions = reactive({
  clientX:0,
  clientY:0,
  movementX:0,
  movementY:0,
})

function clickTest(){
  //EventBus.emit('test')
  vemit('test',{test:'tst'})
}

function onClose(){
  console.log(isOpen.value);
  isOpen.value=false;
}

onMounted(()=>{
  //console.log(modal.value)
  //console.log(modalDrag.value)
  console.log("$root")
  //console.log($root)
  console.log(app.appContext.config.globalProperties.foo)
})

onUnmounted(()=>{
  //console.log("$root")
  //console.log($root)
})

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