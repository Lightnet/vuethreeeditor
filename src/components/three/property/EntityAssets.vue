<script setup>
/*

*/
import axios from 'axios';
import { ref, inject, unref } from 'vue';
import useFetch from '../../hook/useFetch.mjs';
import { ProjectIDInjectKey } from '../context/EntityKeys.mjs';
//const emits = defineEmits(['onClose']);
const log = console.log;
const projectID = inject(ProjectIDInjectKey);

const status = ref("")
const file = ref(null)
const fileID = ref("")
const fileName = ref("")
const assets = ref([]);

const view = ref("assets");

function setStatus(text){
  status.value=text
}

function selectFile(event){
  console.log(event)
  file.value = event.target.files[0]
  setStatus("ready!")
}

function backToAssets(){
  view.value='assets'
}

getAssets();

async function getAssets(){
  let data = await useFetch("/api/assets",{
      method:'POST'
    , headers: {"Content-Type": "application/json"}
    , body: JSON.stringify({ 
      api:'ASSETS',
      projectid:projectID.value
    })
  })
  if(data.error){
    log("ERROR FETCH GET ASSETS");
    return;
  }
  log(data);
  if(data.api=="ASSETS"){
    //setAssets(data.assets)
    assets.value=data.assets;
  }
}

function clickUpload(){
  
  setStatus("uploading...")
  
  if(!file.value){
    log("FILE EMPTY!");
    setStatus("Empty File select!")
    return;
  }

  console.log(unref(file))
  console.log(unref(projectID))
  const formData = new FormData();
  formData.append('myfiles', unref(file));
  formData.append('projectid', unref(projectID));

  const config = {
    onUploadProgress: function(progressEvent) {
      var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      log(percentCompleted)
      //setPercent(percentCompleted);
      setStatus(String(percentCompleted)+"%")
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

  axios.post("/api/upload", formData, config)
  .then(res => {
    log(res)
    if(res.statusText=="OK"){
      console.log("File Uploaded!")
      setStatus("File Uploaded!")
      getAssets();
      backToAssets()
    }
  })
  .catch(err =>{ 
    log(err)
    setStatus(err.message);
  })
}

async function clickDeleteAssetID(){
  let data = await useFetch("/api/assets",{
      method:'DELETE'
    , headers: {"Content-Type": "application/json"}
    , body: JSON.stringify({ 
      api:'DELETE',
      id:fileID.value
    })
  })
  if(data.error){
    log("ERROR FETCH GET ASSETS");
    return;
  }
  log(data);
  if(data.api=="DELETE"){
    //setAssets(data.id)
    //setAssets(state=>state.filter(item=>item.id != data.id))
    assets.value = assets.value.filter(item=>item.id != data.id)
    backToAssets()
  }
}

function clickDeleteFileID(id){
  view.value='delete'
  let item = assets.value.find(item=>item.id == id)
  if(item){
    fileID.value = item.id;
    fileName.value = item.filename;
  }
}

</script>
<template>
  <template v-if="view=='assets'">
    <div> 
      <div>
        Assets: <button @click="view='upload'"> Upload File </button>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <label> ID </label>
              </td>
              <td>
                <label> Name </label>
              </td>
              <td>
                <label> Actions </label>
              </td>
            </tr>
            <template v-for="item in assets" :key="item.id">
            <tr>
              <td>
                <label>{{item.id}} </label>
              </td>
              <td>
                <label>{{item.filename}} </label>
              </td>
              <td>
                <button @click="clickDeleteFileID(item.id)"> Delete </button>
              </td>
            </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  <template  v-if="view=='upload'">
      <div>
        File <input type="file" @change="selectFile" /> <label> Status:{{status}} </label>  <br/>
        <button @click="clickUpload"> Upload File </button>
        <button @click="backToAssets"> Back </button>
      </div>
  </template>
  <template  v-if="view=='delete'">
      <div>
        <label>File ID:{{fileID}} </label><br/>
        <label>File Name:{{fileName}} </label><br/>
        <button @click="clickDeleteAssetID"> Delete </button>
        <button @click="backToAssets"> Back </button>
      </div>
  </template>
</template>
<!--

-->