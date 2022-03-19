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
    console.log(entities)

    app.provide('entities', entities); // mutable

    app.config.globalProperties.$addEntity = (entity)=>{
      //console.log(this)
      //console.log(entities)
      if(!entity.id){
        entity.id = nanoid16()
      }
      
      entities.value.push(entity)
      //console.log(this.entities)//nope

      console.log(entity)
      //console.log(options)
    }

    app.config.globalProperties.$deleteEntityID = (id)=>{
      entities.value = entities.value.filter(item=>item.id!==id)
    }

    //app.config.globalProperties.$authStatus = value =>{
      //app.provide('authStatus', value)//nope
    //}

    //app.config.globalProperties.API_URL = "http://localhost:3000"

  }
}

export default entityPlugin;
/*
app.provide there different ways.

1, plugin and child
2, parent and child
*/
