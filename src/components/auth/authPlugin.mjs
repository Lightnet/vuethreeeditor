/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://vuejs.org/guide/reusability/plugins.html#introduction
// https://www.youtube.com/watch?v=ar1fJECxbyU
// How to build your own VUE PLUGINS
import { ref } from 'vue'
import AuthAccess from "./AuthAccess.vue"
export const authPlugin = {
  install(app, options) {
    // configure the app
    const token = ref("")
    const expire = ref(0)
    const authStatus = ref('login')
    console.log(token)

    app.provide('AUTHKEY', '0000') // read only
    app.provide('authStatus', authStatus) //mutable
    app.provide('token', token) //mutable
    app.provide('expire', expire) //mutable

    app.component('auth-access', AuthAccess);
    
    app.mixins({
      data(){
        return{
          API_URL:"http://localhost:3000"
        }
      },
      created() {
        console.log("printing from created.")
      },
    })

    const logout = ()=>{
      console.log("logout is being called")
    }

    app.provide('logout',logout)
    /*
    import {inject} from 'vue';
    const logout = inject('logout')
    */
    //app.config.globalProperties.$authStatus = value =>{
      //app.provide('authStatus', value)//nope
    //}
    //app.config.globalProperties.API_URL = "http://localhost:3000"
  }
}

export default authPlugin;
/*
app.provide there different ways.

1, plugin and child
2, parent and child
*/
