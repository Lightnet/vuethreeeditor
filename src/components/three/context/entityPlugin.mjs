/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://vuejs.org/guide/reusability/plugins.html#introduction

import { ref } from 'vue'
import { nanoid16 } from '../../../lib/helper.mjs'

export const entityPlugin = {
  install(app, options) {
    // configure the app
    const entities = ref([])
    //console.log(entities)
    app.provide('entities', entities); // mutable
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
            return item;
          }
          return item;
        })
      }
    }
    app.provide('updateEntity',updateEntity)

    const deleteEntityID = (id)=>{
      entities.value = entities.value.filter(item=>item.objectid!==id)
      //console.log(entities)
    }
    app.provide('deleteEntityID',deleteEntityID)

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
