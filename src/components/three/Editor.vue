<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import useFetch from "../hook/useFetch.mjs"
import { isEmpty } from "../../lib/helper.mjs"
import { inject, onMounted } from "vue"
import EditorSideBarTop from "./ui/EditorSideBarTop.vue";
import EditorSideBarRight from "./ui/EditorSideBarRight.vue";
import EditorSideBarLeft from "./ui/EditorSideBarLeft.vue";
import EditorViewport3D from "./ui/EditorViewport3D.vue";
import { 
  ProjectIDInjectKey
, ProjectNameInjectKey
, SceneIDInjectKey
, SceneNameInjectKey 
, MapEntityInjectKey
} from "./context/EntityKeys.mjs";
import Modal from "../modal/Modal.vue";
import EntityConfig from "./context/EntityConfig.mjs"

const projectID = inject(ProjectIDInjectKey);
const projectName = inject(ProjectNameInjectKey);
const sceneID = inject(SceneIDInjectKey);
const sceneName = inject(SceneNameInjectKey);

const mapEntity = inject(MapEntityInjectKey);

const props = defineProps({
  projectid:String
});
//console.log(props)
//console.log("Editor onMount!",props.projectid)
//console.log(projectID)
projectID.value = props.projectid;

getProjectData();

//get project data from fetch
async function getProjectData(){
  if(isEmpty(projectID.value)){
    console.log("Empty projectID!",projectID.value);
    EntityConfig.setSave(false)
    return;
  }
  let data = await useFetch('api/project',{
    method:'POST'
    , headers: {"Content-Type": "application/json"}
    , body: JSON.stringify({ 
      api:'PROJECT',
      projectid:projectID.value
    })
  });
  if(data.error){
    console.log("ERROR FETCH GET PROJECT");
    return;
  }
  console.log(data);
  if(data.api=='PROJECT'){
    EntityConfig.setSave(true)
    console.log('API get Project!');
    //setSceneID(data.sceneid);
    //setProjectName(data.name);
    sceneID.value = data.sceneid
    projectName.value = data.name
    getSceneEntities();
  }
}

//get entity objects data from fetch
async function getSceneEntities(){
  if(isEmpty(sceneID.value)){
    console.log("Empty sceneID!");
    return;
  }
  let data = await useFetch('api/entity',{
    method:'POST'
    , headers: {"Content-Type": "application/json"}
    , body: JSON.stringify({ 
        api:'ENTITIES'
      , projectid:projectID.value
      , sceneid:sceneID.value
    })
  });
  if(data.error){
    console.log("ERROR FETCH GET ENTITIES");
    return;
  }
  //console.log(data);
  if(data.api=='ENTITIES'){
    console.log('API get entities!');
    if(data.entities.length>=0){
      mapEntity(data.entities);
    }else{
      mapEntity([]);
    }
  }
}

function eventTest(){
  console.log("test....")
}

</script>
<template>

  <div class="editor">
    <EditorSideBarTop/>
    <EditorSideBarLeft/>
    <EditorSideBarRight/>
    <EditorViewport3D/>
  </div>
  <!--
  <Modal @test="eventTest"/>
  -->
</template>

<style scoped>
.editor {
  position: fixed;
  height:100%;
  width:100%;
  top:0px;
  left: 0px;
}
</style>