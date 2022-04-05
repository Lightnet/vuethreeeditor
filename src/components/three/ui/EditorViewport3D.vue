<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://troisjs.github.io/guide/
// https://troisjs.github.io/guide/core/renderer.html#props-from-three-webglrenderer
// https://troisjs.github.io/guide/core/renderer.html#custom-render-function

import { inject, onMounted, onUnmounted, ref, toRaw, unref, watchEffect } from 'vue';
import { PerspectiveCamera, Renderer, Scene, Group } from 'troisjs';

import EntityBox from '../entity/EntityBox.vue';
import EntityTransformControl from '../editor/EntityTransformControl.vue';
import { ENTITIES } from '../context/EntityComponents.mjs';
import CannonWorld from '../../physics/CannonWorld.mjs';
import { 
  EntitiesInjectKey
, SelectObjectIDInjectKey
, SelectObjectUUIDInjectKey
, UpdateEntityInjectKey
, SceneBackGroundColorInjectKey
, RenderAlphaInjectKey
, RenderAntisaliasInjectKey
, RenderAutoClearInjectKey
, RenderPointerInjectKey
, RenderShadowInjectKey
, EnableOrbitControlInjectKey
, GravityPhysicsInjectKey
, EnablePhysicsInjectKey
} from '../context/EntityKeys.mjs';
//import EntityTroisjsText from "../entity/EntityTroisjsText.vue"
import EntityText2D from "../entity/EntityText2D.mjs"
import EntityCamera from "../entity/EntityCamera.mjs"

const entity = ref({});
const objEntities = ref([]);
const physEntities = ref([]);
const entities = inject(EntitiesInjectKey);

const selectObjectUUID = inject(SelectObjectUUIDInjectKey);
const selectObjectID = inject(SelectObjectIDInjectKey);
const updateEntity = inject(UpdateEntityInjectKey);

const renderer = ref();//full access scene, three and other configs.
const scene = ref();//not access?
const sceneBackGroundColor = inject(SceneBackGroundColorInjectKey)

const gravity = inject(GravityPhysicsInjectKey)
const enablePhysics = inject(EnablePhysicsInjectKey)

const isOrbitCtrl = inject(EnableOrbitControlInjectKey)
const isAlpha = inject(RenderAlphaInjectKey)
const isAntialias = inject(RenderAntisaliasInjectKey)
const isAutoClear = inject(RenderAutoClearInjectKey)
const isPointer = inject(RenderPointerInjectKey)
const isShadow = inject(RenderShadowInjectKey)

watchEffect(()=>{
  //console.log(entities)
  //objEntities.value = unref(entities.value);
  //objEntities.value = []
  let objEnties = unref(entities.value);
  objEntities.value = objEnties.filter(item=>item?.isPhysics !== true)
  physEntities.value = objEnties.filter(item=>item?.isPhysics == true);
  //console.log("isOrbitCtrl: ",isOrbitCtrl.value)
})

onMounted(() =>{
  //https://troisjs.github.io/guide/core/raf.html
  //console.log("renderer.value.three.cameraCtrl")
  //console.log(renderer.value.three.cameraCtrl)
});

onUnmounted(() =>{
  
});

//check entity object types for element setup component
function checkEntityComp(entity){
  //console.log("init?")
  let componentEntity = ENTITIES.find(item=>item.dataType == entity.dataType)
  if(componentEntity){
    return componentEntity.comp;
  }else{
    return EntityBox;
  }
}

function updateTransform(mode){
  entity.value=null;
  //console.log("update object:",mode)
  //console.log(renderer.value.scene)
  let obj3d = renderer.value.scene.getObjectByProperty('uuid',selectObjectUUID.value)
  if(obj3d){
    //console.log("FOUND//////////?",obj3d)
    entity.value = entities.value.find(item=>item.objectid==unref(selectObjectID))
    if(mode == "translate"){//position
      //console.log(obj3d.position)
      //entity.value.position[obj3d.position.x,obj3d.position.y,obj3d.position.z];
      entity.value.position[0]=obj3d.position.x;
      entity.value.position[1]=obj3d.position.y;
      entity.value.position[2]=obj3d.position.z;
      //console.log(entity.value.position)
      let query = {
        objectid: entity.value.objectid
        , type:"position"
        , value:entity.value.position
      }
      //console.log("query: ",query)
      updateEntity(query)
    }
    if(mode == "rotate"){
      entity.value.rotation[0]=obj3d.rotation.x;
      entity.value.rotation[1]=obj3d.rotation.y;
      entity.value.rotation[2]=obj3d.rotation.z;
      let query = {
        objectid:selectObjectID.value
        , type:"rotation"
        , value:entity.value.rotation
        //, value:[obj3d.rotation.x,obj3d.rotation.y,obj3d.rotation.z]
      };
      updateEntity(query)
    }

    if(mode == "scale"){
      //objEntity.scale[obj3d.scale.x,obj3d.scale.y,obj3d.scale.z];
      entity.value.scale[0]=obj3d.scale.x;
      entity.value.scale[1]=obj3d.scale.y;
      entity.value.scale[2]=obj3d.scale.z;
      updateEntity({
        objectid:selectObjectID.value
        , type:"scale"
        , value:entity.value.scale
        //, value:[obj3d.scale.x,obj3d.scale.y,obj3d.scale.z]
      })
    }
  }
}

function onBeforeStep(cannon){

}

//resize="window"
</script>
<template>
  <div class="viewport">
  <Renderer ref="renderer" :resize="true" :orbitCtrl="isOrbitCtrl" :alpha="isAlpha" :antialias="isAntialias" :autoClear="isAutoClear" :pointer="isPointer" :shadow="isShadow" >
    
    <Scene ref="scene" :background="sceneBackGroundColor">
      <EntityCamera ref="camera" :position="{ z: 10 }">
        <Group :position="{y:0,z:-3}">
          <EntityText2D text="Hello World" :position="{y:1,z:0}"/>
        </Group>
      </EntityCamera>
      
      <EntityTransformControl :selectObjectID="selectObjectUUID" @update-transform="updateTransform"/>
      <template v-if="enablePhysics">
        <template v-for="entity in objEntities" :key="entity.objectid">
          <component :is="checkEntityComp(entity)" v-bind="entity" />
        </template>
        <CannonWorld :gravity="{ x: gravity[0], y:gravity[1], z: gravity[2] }" @before-step="onBeforeStep">
          <template v-for="entity in physEntities" :key="entity.objectid">
            <component :is="checkEntityComp(entity)" v-bind="entity" />
          </template>
        </CannonWorld>
      </template>
      <template v-else>
        <template v-for="entity in objEntities" :key="entity.objectid">
          <component :is="checkEntityComp(entity)" v-bind="entity" />
        </template>
        <template v-for="entity in physEntities" :key="entity.objectid">
          <component :is="checkEntityComp(entity)" v-bind="entity" />
        </template>
      </template>
    </Scene>
  </Renderer>
  </div>
</template>
<style>
.viewport {
  position: fixed;
  top: 20px;
  left: 200px;
  height: calc(100% - 40px);
  width: calc(100% - 400px);
  background: lightgrey;
}
</style>