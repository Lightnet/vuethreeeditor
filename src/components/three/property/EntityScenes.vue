<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { ref, inject } from "vue";
import { isEmpty, nanoid16 } from "../../../lib/helper.mjs";
import useFetch from "../../hook/useFetch.mjs";
import { API } from "../context/API.mjs";
import { ProjectIDInjectKey, ScenesInjectKey } from "../context/EntityKeys.mjs";

const projectID = inject(ProjectIDInjectKey);
const scenes = inject(ScenesInjectKey);

const view = ref("scenes")
const sceneID = ref("")
const sceneDescription = ref("")
const sceneName = ref("ss")

getScenes();

async function getScenes(){
  let data = await useFetch("/api/scene",{
      method:'POST'
    , headers: {"Content-Type": "application/json"}
    , body: JSON.stringify({ 
      api:'SCENES',
      projectid:projectID.value
    })
  })
  if(data.error){
    console.log(data.error);
    console.log("ERROR FETCH GET Scenes");
    return;
  }
  //console.log(data);
  if(data.api=="SCENES"){
    console.log(data.scenes)
    scenes.value = data.scenes;
  }
}

function clickCreateScene(){
  view.value="create";
}

async function CreateScene(){
  console.log(sceneName.value)
  if(isEmpty(sceneName.value)){
    console.log("Empty Field!")
    return;
  }
  let data = await useFetch("/api/scene",{
      method:'POST'
    , headers: {"Content-Type": "application/json"}
    , body: JSON.stringify({ 
        api:API.CREATE
      , projectid:projectID.value
      , name:sceneName.value
      , description:sceneDescription.value || nanoid16()
    })
  })
  if(data.error){
    console.log(data.error)
    console.log("ERROR FETCH CREATE SCENE");
    return;
  }
  console.log(data);
  if(data.api==API.CREATE){
    console.log("CREATE SCENE")
    //setScenes(data.scene)
    let scene ={objectid:data.scene.objectid,name:data.scene.name};
    scenes.value = [...scenes.value, scene]
    //setScenes(state=>[...state, scene])
    //setIsOpenModal(false)
  }
}

function clickEditScene(id){
  view.value="edit";
  let tscene = scenes.value.find(item=>item.objectid == id)
  if(tscene){
    sceneID.value = tscene.objectid;
    sceneDescription.value = tscene.description;
    sceneName.value = tscene.name;
  }
}

async function updateScene(){
  let data = await useFetch("/api/scene",{
      method:'PUT'
    , headers: {"Content-Type": "application/json"}
    , body: JSON.stringify({ 
        api:API.UPDATE
      , id:sceneID.value
      , name:sceneName.value
      , description:sceneDescription.value
    })
  })
  if(data.error){
    console.log("ERROR FETCH GET ASSETS");
    return;
  }
  console.log(data);
  if(data.api==API.UPDATE){
    //setScenes(data.scenes)
    scenes.value = scenes.value.map(item=>{
      if(item.objectid == data.scene.objectid){
        item.name = data.scene.name;
        item.description = data.scene.description;
        return item;  
      }
      return item;
    })
    view.value="scenes";
  }
}

function clickDeleteScene(id){
  view.value="delete";
  let tscene = scenes.value.find(item=>item.objectid == id)
  if(tscene){
    sceneID.value = tscene.objectid;
    sceneDescription.value = tscene.description;
    sceneName.value = tscene.name;
  }
}

async function deleteScene(){
  let data = await useFetch("/api/scene",{
      method:API.DELETE
    , headers: {"Content-Type": "application/json"}
    , body: JSON.stringify({ 
        api:API.DELETE
      , id:sceneID.value
    })
  })
  if(data.error){
    console.log("ERROR FETCH DELETE Scene");
    return;
  }
  console.log(data);
  if(data.api==API.DELETE){
    //setScenes(data.scenes)
    console.log("DELETE")
    scenes.value = scenes.value.filter(item=>item.objectid != data.id)
    //setIsOpenModal(false)
    view.value="scenes";
  }
}

function clickBack(){
  view.value="scenes"
}
</script>

<template>
  <div>
    <div v-if="view=='scenes'">
      <div>
        <label> Entity Scenes: </label><button @click="clickCreateScene"> Create </button>
      </div>
      <div v-for="scene in scenes" :key="scene.objectid"> 
        <label> {{scene.name}}</label>
        <button @click="clickEditScene(scene.objectid)">Edit</button>
        <button @click="clickDeleteScene(scene.objectid)">Delete</button>
      </div>
    </div>
    <div v-else-if="view=='edit'">
      <label> ID:{{sceneID}} </label><br/>
      <label> Name: </label><input :value="sceneName" @change="(e)=>sceneName=e.target.value"  /><br/>
      <button @click="updateScene"> Update </button>
      <button @click="clickBack"> Back </button>
    </div>
    <div v-else-if="view=='create'">
      <label> Name: </label><input :value="sceneName" @change="(e)=>sceneName=e.target.value"  /><br/>
      <button @click="CreateScene"> Create </button>
      <button @click="clickBack"> Back </button>
    </div>
    <div v-else-if="view=='delete'">
      <label> ID: {{sceneID}} </label><br>
      <label> Name: {{sceneName}} </label>
      <button @click="deleteScene"> Delete </button>
      <button @click="clickBack"> Back </button>
    </div>
  </div>
</template>

<style>

</style>