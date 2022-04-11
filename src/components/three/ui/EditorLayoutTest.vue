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

const rightX = ref(0);
const isDrag = ref(false);
const positions = reactive({clientX:0,clientY:0,movementX:0,movementY:0,})

const isDragRIght = ref(false);
const rightBar = ref();
const rightSideBar = ref();

console.log(document)

function leftBarDown(event){
  //event.preventDefault()
  isDrag.value=true;
  positions.clientX = event.clientX
  positions.clientY = event.clientY
  leftWidth.value = contentCenter.value.clientWidth + leftSideBar.value.clientWidth;
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
  
  //pos.x
  leftX.value = (leftBar.value.offsetLeft - positions.movementX);
  leftBar.value.style.left = leftX.value + 'px'

  //left bar
  leftSideBar.value.style.width = leftX.value + 'px'

  // content middle
  contentCenter.value.style.left = leftX.value + 8 + 'px'
  let widthLeft = leftWidth.value - leftX.value ;
  //let widthLeft = (  contentCenter.value.clientWidth + leftSideBar.value.clientWidt) - leftX.value ;
  console.log(( leftX.value ) )
  contentCenter.value.style.width = widthLeft + 'px';

  console.log("move?")
}

function leftBarUp(event){
  isDrag.value=false;
  console.log("up?")
}

function rightBarDown(event){
  isDragRIght.value=true;
  positions.clientX = event.clientX
  positions.clientY = event.clientY
}
function rightBarMove(event){
  if(isDragRIght.value==false){
    return;
  }
  positions.movementX = positions.clientX - event.clientX
  positions.movementY = positions.clientY - event.clientY
  positions.clientX = event.clientX
  positions.clientY = event.clientY
  //bar divider
  rightX.value = (rightBar.value.offsetLeft - positions.movementX);
  rightBar.value.style.left = rightX.value + 'px';
  //panel
  rightSideBar.value.style.left = (rightX.value + 8) + 'px';
  rightSideBar.value.style.width = (rightBar.value.parentNode.clientWidth - rightX.value - 8)  + 'px'
  //content
  let cwidth = rightX.value - contentCenter.value.offsetLeft;
  contentCenter.value.style.width = cwidth + 'px';
  
}
function rightBarUp(event){
  isDragRIght.value=false;
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
    <div ref="rightSideBar" class="sidebarright">
      Right
    </div>
    <div ref="leftBar" class="barleft" @mousedown="leftBarDown" @mousemove="leftBarMove" @mouseup="leftBarUp">
      bar
    </div>
    <div ref="rightBar" class="barright" @mousedown="rightBarDown" @mousemove="rightBarMove" @mouseup="rightBarUp">
      RIGHT bar
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
  cursor: default; /*Will make the cursor not point.*/
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
  /*cursor: none;*/
  position: absolute;
  top:20px;
  left: 208px;
  width:calc(100% - 400px - 8px);
  height:calc(100% - 40px);
  background-color: antiquewhite;
}
.sidebarright{
  /*cursor: none; */
  position: absolute;
  top:20px;
  right: 0px;
  width: 200px;
  height:calc(100% - 40px);
  background-color: gray;
}

.barright{
  cursor:col-resize;
  position: absolute;
  top:20px;
  left: calc(100% - 200px);
  height:calc(100% - 40px);
  width: 8px;
  background-color: black;
  z-index: 2;
}
</style>