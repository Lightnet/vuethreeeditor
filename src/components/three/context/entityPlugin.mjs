/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://vuejs.org/guide/reusability/plugins.html#introduction

import { ref } from 'vue'
import { isEmpty, nanoid16 } from '../../../lib/helper.mjs'
import useFetch from '../../hook/useFetch.mjs'

export const entityPlugin = {
  install(app, options) {
    // configure the app
    const entities = ref([]) // mutable
    const projectID = ref("")
    const projectName = ref("")
    const sceneID = ref("")
    const sceneName = ref("")

    const selectObject = ref({})
    const selectObjectID = ref("")
    const selectObjectUUID = ref("")

    const enablePhysics = ref(false)
    const enableOrbitControl = ref(true)
    const log = console.log;
    
    //console.log(entities)
    app.provide('entities', entities); // mutable
    app.provide('projectID', projectID);
    app.provide('projectName', projectName);
    app.provide('sceneID', sceneID);
    app.provide('sceneName', sceneName);

    app.provide('selectObject', selectObject);
    app.provide('selectObjectID', selectObjectID);
    app.provide('selectObjectUUID', selectObjectUUID);

    app.provide('enablePhysics', enablePhysics);
    app.provide('enableOrbitControl', enableOrbitControl);
    // need to set up filter...
    const addEntity = (entity)=>{
      
      let newEntity={};
      newEntity.objectid = entity.objectid || nanoid16()
      newEntity.name = entity.name || "GROUP"
      newEntity.dataType = entity.dataType || "GROUP"

      if(entity.isTransform){
        newEntity.position = entity.position || [0,0,0]
        newEntity.rotation = entity.rotation || [0,0,0]
        newEntity.scale = entity.scale || [1,1,1]
      }

      if(entity.parameters){
        newEntity.parameters = entity.parameters
      }

      if(entity.shape){
        newEntity.shape = entity.shape
        newEntity.mass = entity.mass
      }

      if(entity.material){
        newEntity.material = entity.material
      }

      apiSaveEntity(entity.projectid, entity.sceneid, newEntity)

      //entities.value.push(ref(newEntity))
      entities.value.push(newEntity)
      //console.log(entities)
      //console.log(entity)
    }

    app.provide('addEntity',addEntity)

    const updateEntity = (args)=>{
      console.log(args)
      if(args.type){
        //console.log("HELLO?")
        entities.value = entities.value.map(item=>{
          if(item.objectid==args.objectid){
            console.log(item)
            if(args.type=="position"){
              item.position = args.value;
            }
            if(args.type=="rotation"){
              item.rotation = args.value;
            }
            if(args.type=="scale"){
              item.scale = args.value;
            }
            if(args.type=="parameters"){
              item.parameters = args.value;
            }

            apiUpdateEntity(item);


            return item;
          }
          return item;
        })
      }
    }
    app.provide('updateEntity',updateEntity)

    const deleteEntityID = (id)=>{

      apiDeleteEntity(id);
      entities.value = entities.value.filter(item=>item.objectid!==id)
      //console.log(entities)
    }
    app.provide('deleteEntityID',deleteEntityID)

    const mapEntityID = (objs)=>{
      entities.value = objs;
    }

    app.provide('mapEntityID',mapEntityID)

    //need to set up url save, delete, update entity objects

    // fetch for saving data
    async function apiSaveEntity(projectid, sceneid, entity){
      if(isEmpty(projectid)||isEmpty(sceneid)){
        log('save entity empty fields ids.');
        return;
      }
      let data = await useFetch('api/entity',{
        method:'POST'
        , headers: {"Content-Type": "application/json"}
        , body:JSON.stringify({ 
            api:'CREATE'
          , projectid: projectid
          , sceneid: sceneid
          , data:entity})
      });
      //log(data);
      if(data.error){
        log("ERROR FETCH Save Entity!");
        //msgError('Fetch Error on Save Object3D');
        return;
      }
      log("useFetch save Entity!");
    }

  // fetch for delete data
  async function apiDeleteEntity(id){
    if(isEmpty(id)){
      log('delete entity null.');
      return;
    }
    let data = await useFetch('api/entity',{
      method:'DELETE'
      , headers: {"Content-Type": "application/json"}
      , body:JSON.stringify({ 
          api:'DELETE'
        , objectid: id
      })
    });
    //log(data);
    if(data.error){
      log("ERROR FETCH DELETE Entity!");
      //msgError('Fetch Error on Save Object3D');
      return;
    }
    log("useFetch delete Entity!");
  }

  // fetch for update data
  async function apiUpdateEntity(entity){
    if(!entity){
      log('update entity null.');
      return;
    }
    let data = await useFetch('api/entity',{
      method:'PUT'
      , headers: {"Content-Type": "application/json"}
      , body:JSON.stringify({ 
          api:'UPDATE'
        , data: entity
      })
    });
    //log(data);
    if(data.error){
      log("ERROR FETCH UPDATE Entity!");
      //msgError('Fetch Error on Save Object3D');
      return;
    }
    log("useFetch UPDATE Entity!");
  }

  }
}

export default entityPlugin;
/*
import { ref, inject } from "vue";

const deleteEntityID = inject('deleteEntityID');
const entities = inject('entities');
  
function clickDelete(id){
  console.log("delete:", id)
  deleteEntityID(id);
}
</script>
*/

/*
app.provide there different ways.

1, plugin and child
2, parent and child
*/
