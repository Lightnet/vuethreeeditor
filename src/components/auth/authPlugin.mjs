/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://vuejs.org/guide/reusability/plugins.html#introduction
import { ref } from 'vue'

export const authPlugin = {
  install(app, options) {
    // configure the app
    const token = ref("")
    console.log(token)

    app.provide('AUTHKEY', '0000') // read only
    app.provide('authStatus', ref('logind')) //mutable
    app.provide('token', ref("")) //mutable
    app.provide('expire', ref("")) //mutable

    //app.config.globalProperties.$authStatus = value =>{
      //app.provide('authStatus', value)//nope
    //}

    app.config.globalProperties.API_URL = "http://localhost:3000"

  }
}

export default authPlugin;
/*
app.provide there different ways.

1, plugin and child
2, parent and child
*/
