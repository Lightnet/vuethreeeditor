/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://vuejs.org/guide/reusability/plugins.html#introduction
import { ref } from 'vue'

export const entityPlugin = {
  install(app, options) {
    // configure the app
    const entities = ref([])
    console.log(entities)

    app.provide('entities', entities); // mutable

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
