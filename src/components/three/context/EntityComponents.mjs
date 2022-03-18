/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { API } from "./API.mjs";

var ENTITIES=[]
var loaded;
if(global.ENTITIES){
  loaded=true;
}

if(!loaded){
  AddCompObjEntity({
    name:"scene"
    , isTransform:true
    , dataType:API.ENTITYTYPES.SCENE
    , comp:EntityScene
    , compRef:EntitySceneRef
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
  AddCompObjEntity({
    name:"box"
    , isTransform:true
    , dataType:API.ENTITYTYPES.BOX
    , comp:EntityBox
    , compRef:EntityBoxRef
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
  global.ENTITIES=ENTITIES;
}

export function addEntity(args){
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
