<script setup>
// https://stackoverflow.com/questions/46345947/vuejs-get-width-of-div
// https://forum.vuejs.org/t/getting-the-width-an-height-of-an-element-in-a-component/15280
// https://dev.to/mandrewcito/vue-js-draggable-div-3mee
// 
// 
// 
import { reactive, ref } from 'vue';

const leftWidth =ref(0);
const leftX = ref(0);

const leftBar = ref();
const leftSideBar = ref();

const contentCenter = ref();
const parentWidth = ref();

const rightX = ref(0);
const isDrag = ref(false);
const positions = reactive({clientX:0,clientY:0,movementX:0,movementY:0,})

console.log(document)

function leftBarDown(event){
  event.preventDefault()
  isDrag.value=true;
  positions.clientX = event.clientX
  positions.clientY = event.clientY
  leftWidth.value = contentCenter.value.clientWidth;
  console.log(contentCenter.value.parentNode.clientWidth)
  parentWidth.value = contentCenter.value.parentNode.clientWidth;
  console.log("down?")
}

function leftBarMove(event){
  //event.preventDefault()
  if(isDrag.value==false){
    return;
  }
  positions.movementX = positions.clientX - event.clientX
  positions.movementY = positions.clientY - event.clientY
  positions.clientX = event.clientX
  positions.clientY = event.clientY
  //console.log(positions)
  //leftBar.value.style.top = (leftBar.value.offsetTop - positions.movementY) + 'px'
  leftX.value = (leftBar.value.offsetLeft - positions.movementX);
  leftBar.value.style.left = leftX.value + 'px'
  leftSideBar.value.style.width = leftX.value + 'px'
  contentCenter.value.style.left = leftX.value + 4 + 'px'
  //console.log(leftSideBar.value.style.width)
  //console.log(contentCenter.value.style.width)
  //console.log(contentCenter.value)
  //console.log(contentCenter.value.clientHeight)
  //console.log(contentCenter.value.clientWidth)
  //contentCenter.value.style.width = (leftWidth.value - leftX.value) + 'px';
  //contentCenter.value.style.width = (leftWidth.value +  - leftX.value ) + 'px';
  let widthLeft = parentWidth.value - 208;
  contentCenter.value.style.width = (widthLeft - leftX.value ) + 'px';


  console.log("move?")
}

function leftBarUp(event){
  isDrag.value=false;
  console.log("up?")
}
</script>
<template>
  <div class="econtainer">
    <div ref="leftSideBar" class="sidebarleft" >
      Left
    </div>
    <div ref="contentCenter" class="contentcenter">
      Middle
    </div>
    <div class="sidebarright">
      Right
    </div>
    <div ref="leftBar" class="barleft" @mousedown="leftBarDown" @mousemove="leftBarMove" @mouseup="leftBarUp">
      bar
    </div>
  </div>
</template>
<style>
.econtainer{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: darkgray;
}
.sidebarleft{
  position: absolute;
  top:20px;
  left: 0px;
  width: 200px;
  height:calc(100% - 40px);
  background-color: gray;
}
.barleft{
  cursor:col-resize;
  position: absolute;
  top:20px;
  left: 200px;
  height:calc(100% - 40px);
  width: 8px;
  background-color: black;
  z-index: 2;
}
.contentcenter{
  position: absolute;
  top:20px;
  left: 208px;
  width:calc(100% - 400px - 16px);
  height:calc(100% - 40px);
  background-color: antiquewhite;
}
.sidebarright{
  position: absolute;
  top:20px;
  right: 0px;
  width: 200px;
  height:calc(100% - 40px);
  background-color: gray;
}
</style>