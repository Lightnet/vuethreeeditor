<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
// executed in setup() scope (for each instance)
// https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits

import { onMounted,h, ref } from 'vue';
import { isEmpty } from '../../lib/helper.mjs';
import useFetch from "../hook/useFetch.mjs";

const props = defineProps({
  projectID:String
});

const log = console.log;

const projectName = ref("")
const projectDesciption = ref("none")
const projectID = ref("")

const view = ref("project")

const emit = defineEmits(['loadProject']);

//let projects = [
  //{id:"01",name:"test",description:"test1"},
  //{id:"02",name:"test2",description:"test2"}
//]

let projects =ref([])

async function getProejctList(){
  let data = await useFetch("/api/project");
  //log(data);
  if(data.error){
    log("ERROR FETCH PROJECT LIST")
    return;
  }
  log(data);
  if(data.api=='LIST'){
    console.log(data.projects)
    projects.value =data.projects;
  }
}

onMounted(()=>{
  console.log("project MOUNT!")
  getProejctList();
})

function clickCreateProject(){
  view.value="create";
}

async function createProject(){
  if((isEmpty(projectName.value))||isEmpty(projectDesciption.value)){
    console.log("Empty fields!");
    return;
  }
  let data = await useFetch('api/project',{
    method:'POST'
    , headers: {"Content-Type": "application/json"}
    , body: JSON.stringify({ 
      api:'CREATE',
      name:projectName.value,
      description:projectDesciption.value
    })
  });
  if(data.error){
    log(data.error);
    log("ERROR FETCH CREATE PROJECT");
    return;
  }
  log(data);
  if(data.api=='CREATE'){
    log('API created Project!');
    //setProjects(state=>[...state,data.project])
    projects = [...projects,data.project]
    //setIsOpenModal(false);
  }
}

function clickEditProject(){
  //check
  view.value="create";
}

async function editProject(){
  if((isEmpty(projectName.value))||isEmpty(projectDesciption.value)){
    log("Empty fields!");
    return;
  }
  let data = await useFetch('api/project',{
    method:'PUT'
    , headers: {"Content-Type": "application/json"}
    , body: JSON.stringify({ 
        api:'UPDATE'
      , id:projectID.value
      , name:projectName.value
      , description:projectDesciption.value
    })
  });
  if(data.error){
    log("ERROR FETCH CREATE PROJECT");
    return;
  }
  log(data);
  if(data.api=='UPDATE'){
    log('API created Project!');
    projects = projects.map(item=> item.id == data.project.id ? {...item, name:data.project.name,description:data.project.description   }: item );
    //setProjects(projects.map(item=> item.id == data.project.id ? {...item, name:data.project.name,description:data.project.description   }: item ))
    //setIsOpenModal(false);
  }
}

function clickDeleteProject(){
  view.value="delete";
}

async function deleteProject(){
  if(isEmpty(projectID.value)){
      log("Empty projectID!");
      return;
    }
    let data = await useFetch('api/project',{
      method:'DELETE'
      , headers: {"Content-Type": "application/json"}
      , body: JSON.stringify({ 
          api:'DELETE'
        , id:projectID.value
      })
    });
    if(data.error){
      log("ERROR FETCH DELETE PROJECT");
      return;
    }
    log(data);
    if(data.api=='DELETE'){
      log('API delete Project!');
      //setProjects(projects.filter(item=> item.id != data.projectid ))
      //setIsOpenModal(false);
    }
}

function clickViewProject(){
  view.value="project";
}

function loadProject(id){
  console.log(id)
  emit('loadProject',id)
}

const renderTest = () => {//pass
  let ltest = h('label',"test");
  return h('div', [ltest]);
};

function test(){
  console.log(projectName.value)
}

</script>

<template>
  <div>
    <renderTest />
    <label> Projects: </label><button @click="clickCreateProject"> Create </button>
  </div>
  <template v-if="view =='project'">
  <div>
    <table>
      <tbody>
        <tr>
          <td> ID: </td>
          <td> Name: </td>
          <td> Description: </td>
          <td> Actions: </td>
        </tr>

        <template v-for="project in projects" :key="project.id" >
          <tr>
            <td> {{project.id}} </td>
            <td> {{project.name}} </td>
            <td> {{project.description}} </td>
            <td>
              <button @click="clickEditProject"> Edit </button>
              <button @click="loadProject(project.id)"> Load </button>
              <button @click="clickDeleteProject"> Delete </button>
            </td>
          </tr>
        </template>

      </tbody>
    </table>
  </div>
  </template>

  <template v-if="view =='create'">
    <label> Name: </label> <input :value="projectName" @change="(e)=>projectName=e.target.value" /><br/>
    <label> Desciption: </label> <input :value="projectDesciption" @change="(e)=>projectDesciption=e.target.value" /><br/>
    <button @click="createProject"> Create </button>
    <button @click="clickViewProject"> Cancel </button>
  </template>

  <template v-if="view =='edit'">
    <label> Name: </label> <input :value="projectName" @change="(e)=>projectName=e.target.value" /><br/>
    <label> Desciption: </label> <input :value="projectDesciption" @change="(e)=>projectDesciption=e.target.value" /><br/>
    <button @click="editProject"> Update </button>
    <button @click="clickViewProject"> Cancel </button>
  </template>

  <template v-if="view =='delete'">
    <label> ID: </label> <label> {{projectID}}</label><br/>
    <label> Name:</label><label> {{projectName}}</label><br/>
    <label> Desciption: </label> <label> {{projectDesciption}}</label><br/>
    <button @click="deleteProject"> Delete </button>
    <button @click="clickViewProject"> Cancel </button>
  </template>
  
</template>