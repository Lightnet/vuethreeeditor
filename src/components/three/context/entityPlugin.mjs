/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://vuejs.org/guide/reusability/plugins.html#introduction

import { ref } from 'vue'
import { isEmpty, nanoid16 } from '../../../lib/helper.mjs'
import useFetch from '../../hook/useFetch.mjs'

import EntityConfig from './EntityConfig.mjs'

import { 
  AddEntityInjectKey
, DeleteEntityIDInjectKey
, EnableOrbitControlInjectKey
, EnablePauseInjectKey, EnablePhysicsInjectKey
, EnablePhysicsPauseInjectKey, EntitiesInjectKey
, GravityPhysicsInjectKey, MapEntityInjectKey
, ProjectIDInjectKey
, ProjectNameInjectKey
, RenderAlphaInjectKey, RenderAntisaliasInjectKey, RenderAutoClearInjectKey, RenderPointerInjectKey, RenderShadowInjectKey, SceneBackGroundColorInjectKey, SceneIDInjectKey
, SceneNameInjectKey
, ScenesInjectKey
, SelectObjectIDInjectKey
, SelectObjectInjectKey
, SelectObjectUUIDInjectKey
, UpdateEntityInjectKey 

} from './EntityKeys.mjs'

export const entityPlugin = {
  install(app, options) {
    // configure the app
    
    
    const log = console.log;
    
    //ENTITIES
    const entities = ref([]) // mutable
    app.provide(EntitiesInjectKey, entities); // mutable

    //PROJECT
    const projectID = ref("")
    const projectName = ref("")
    app.provide(ProjectIDInjectKey, projectID);
    app.provide(ProjectNameInjectKey, projectName);

    //SCENE
    const sceneID = ref("")
    const sceneName = ref("")
    const scenes = ref([])
    app.provide(SceneIDInjectKey, sceneID);
    app.provide(SceneNameInjectKey, sceneName);
    app.provide(ScenesInjectKey, scenes);

    //const sceneBackGroundColor = ref("#ffffff")
    const sceneBackGroundColor = ref("#000000")
    app.provide(SceneBackGroundColorInjectKey, sceneBackGroundColor);

    // SELECT OBJECT
    const selectObject = ref({})
    const selectObjectID = ref("")
    const selectObjectUUID = ref("")
    app.provide(SelectObjectInjectKey, selectObject);
    app.provide(SelectObjectIDInjectKey, selectObjectID);
    app.provide(SelectObjectUUIDInjectKey, selectObjectUUID);

    // PHYSICS
    const enablePhysics = ref(false)
    const enablePhysicsPause = ref(false)
    const gravityPhysics = ref([0,-9.82,0])
    app.provide(EnablePhysicsInjectKey, enablePhysics);
    app.provide(EnablePhysicsPauseInjectKey, enablePhysicsPause);
    app.provide(GravityPhysicsInjectKey, gravityPhysics);
    
    // THREE?
    const isPause = ref(false)
    app.provide(EnablePauseInjectKey, isPause);

    // RENDERER
    const enableOrbitControl = ref(true)
    app.provide(EnableOrbitControlInjectKey, enableOrbitControl);
    const RenderAlpha = ref(false);
    app.provide(RenderAlphaInjectKey, RenderAlpha);
    const RenderAntisalias = ref(false);
    app.provide(RenderAntisaliasInjectKey, RenderAntisalias);
    const RenderAutoClear = ref(true);
    app.provide(RenderAutoClearInjectKey, RenderAutoClear);
    const RenderPointer = ref(false);
    app.provide(RenderPointerInjectKey, RenderPointer);
    const RenderShadow = ref(false);
    app.provide(RenderShadowInjectKey, RenderShadow);


    // need to set up filter...
    const addEntity = (entity)=>{
      console.log(EntityConfig)
      console.log("entity>>>>")
      console.log(entity)
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
        newEntity.parameters = entity.parameters;
      }
      if(typeof entity.isPhysics == 'boolean'){
        newEntity.isPhysics = entity.isPhysics || false;
        newEntity.mass = entity.mass || 0;
      }
      
      if(entity.shape){
        newEntity.shape = entity.shape
        //newEntity.mass = entity.mass
      }

      if(entity.material){
        newEntity.material = entity.material
      }

      if(EntityConfig.autoSave){
        apiSaveEntity(entity.projectid, entity.sceneid, newEntity)
      }

      //entities.value.push(ref(newEntity))
      entities.value.push(newEntity)
      //console.log(entities)
      //console.log(entity)
    }

    app.provide(AddEntityInjectKey,addEntity)

    const updateEntity = (args)=>{
      console.log(args)
      if(args.type){
        //console.log("HELLO?")
        entities.value = entities.value.map(item=>{
          if(item.objectid==args.objectid){
            console.log(item)
            if(args.type=="position"){
              //console.log("args.value")
              //console.log(args.value)
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
            if(args.type=="material"){
              item.material = args.value;
            }
            if(args.type=="isPhysics"){
              item.isPhysics = args.value;
            }
            if(args.type=="mass"){
              item.mass = args.value;
            }

            if(EntityConfig.autoSave){
              apiUpdateEntity(item);
            }

            return item;
          }
          return item;
        })
      }
    }
    app.provide(UpdateEntityInjectKey,updateEntity)

    const deleteEntityID = (id)=>{

      if(EntityConfig.autoSave){
        apiDeleteEntity(id);
      }
      
      entities.value = entities.value.filter(item=>item.objectid!==id)
      //console.log(entities)
    }
    app.provide(DeleteEntityIDInjectKey,deleteEntityID)

    const mapEntityID = (objs)=>{
      entities.value = [...objs];
    }
    app.provide(MapEntityInjectKey,mapEntityID)

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
import { EntitiesInjectKey, DeleteEntityIDInjectKey } from './EntityKeys.mjs'

const deleteEntityID = inject(DeleteEntityIDInjectKey);
const entities = inject(EntitiesInjectKey);
  
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
