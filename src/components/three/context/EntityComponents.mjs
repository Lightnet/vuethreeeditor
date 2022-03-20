/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { API } from "./API.mjs";
import { nanoid32 } from "../../../lib/helper.mjs"
import EntityScene from "../entity/EntityScene.vue"
import EntityPointLight from "../entity/EntityPointLight.vue"
import EntityBox from "../entity/EntityBox.vue"
var ENTITIES=[]
var loaded;
if(window.ENTITIES){
  loaded=true;
}

if(!loaded){
  addObjEntity({
    name:"scene"
    , isTransform:true
    , dataType:API.ENTITYTYPES.SCENE
    , comp:EntityScene
    //, compRef:EntitySceneRef
    , shape:"BOX"
    , mass:1
    , parameters:[
      {
          autoUpdate:true
        , background:null
        , environment:null
        , fog:null
        , overrideMaterial:null
      }
    ]
  })

  addObjEntity({
    name:"pointlight"
    , isTransform:true
    , dataType:API.ENTITYTYPES.POINTLIGHT
    , comp:EntityPointLight
    //, compRef:EntityPointLightRef
    , shape:"BOX"
    , mass:1
    , parameters:[
      {
        color:"#ffffff"
        , intensity:1
        , environment:null
      }
    ]
  })
  
  addObjEntity({
    name:"box"
    , isTransform:true
    , dataType:API.ENTITYTYPES.BOX
    , comp:EntityBox
    //, compRef:EntityBoxRef
    , shape:"BOX"
    , mass:1
    , parameters:[
      {
          width:1
        , height: 1 
        , depth:1 
      },
      {
          width: 1
        , height: 1 
        , depth: 1 
        , widthSegments: 1 
        , heightSegments: 1 
        , depthSegments: 1 
      }
    ],
    material:[{
        index:0
      , objectid:nanoid32()
      , dataType:"meshStandardMaterial"
      , name:"meshStandardMaterial"
      , color:"#ffffff"
      , wireframe:false
    }]
  })
  loaded=true
  window.ENTITIES=ENTITIES;
}

export function addObjEntity(args){
  let item = ENTITIES.find(item=>item.name==args.name)
  if(!item){
    ENTITIES.push(args)
  }
}

export {
  ENTITIES
}





























/*
<script setup>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    
  },
})
</script>
*/
