/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://troisjs.github.io/guide/meshes/geometries.html

import { API } from "./API.mjs";
import { nanoid32 } from "../../../lib/helper.mjs"
import EntityScene from "../entity/EntityScene.vue"
import EntityCamera from "../entity/EntityCamera.vue"

import EntityPointLight from "../entity/EntityPointLight.vue"
import EntityAmbientLight from "../entity/EntityAmbientLight.vue"

import EntityBox from "../entity/EntityBox.vue"
import EntityCylinder from "../entity/EntityCylinder.vue"
import EntityPlane from "../entity/EntityPlane.vue"
import EntitySphere from "../entity/EntitySphere.vue"


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
    name:"camera"
    , isTransform:true
    , dataType:API.ENTITYTYPES.CAMERA
    , comp:EntityCamera
    //, compRef:EntitySceneRef
    , shape:"BOX"
    , mass:1
    , parameters:[
      {
        fov:50
        , aspect:1
        , near:0.1
        , far:2000
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
        , distance :0
        , decay :1
      }
    ]
  })

  addObjEntity({
    name:"AmbientLight"
    , isTransform:false
    , dataType:API.ENTITYTYPES.AMBIENTLIGHT
    , comp:EntityAmbientLight
    //, compRef:EntityPointLightRef
    , shape:null
    , mass:1
    , parameters:[
      {
        color:"#ffffff"
        , intensity:1
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

  addObjEntity({
    name:"Cylinder"
    , isTransform:true
    , dataType:API.ENTITYTYPES.CYLINDER
    , comp:EntityCylinder
    //, compRef:EntityBoxRef
    , shape:"CYLINDER"
    , mass:1
    , parameters:[
      {
        radiusTop:1
        , radiusBottom : 1 
        , height: 1 
        , radialSegments: 8
      },
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



  addObjEntity({
    name:"plane"
    , isTransform:true
    , dataType:API.ENTITYTYPES.PLANE
    , comp:EntityPlane
    //, compRef:EntityBoxRef
    , shape:"BOX"
    , mass:1
    , parameters:[
      {
          width:1
        , height: 1 
      },
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

  addObjEntity({
    name:"sphere"
    , isTransform:true
    , dataType:API.ENTITYTYPES.SPHERE
    , comp:EntitySphere
    //, compRef:EntityBoxRef
    , shape:"SPHERE"
    , mass:1
    , parameters:[
      {
        radius:1
        , widthSegments: 32
        , heightSegments: 16
      },
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
