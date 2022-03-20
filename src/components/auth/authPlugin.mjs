/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://vuejs.org/guide/reusability/plugins.html#introduction
// https://www.youtube.com/watch?v=ar1fJECxbyU
// How to build your own VUE PLUGINS
import axios from 'axios'
import { ref } from 'vue'
import { parseJwt } from '../../lib/helper.mjs'
import AuthAccess from "./AuthAccess.vue"
export const authPlugin = {
  install(app, options) {
    // configure the app

    const version = Number(app.version.split('.')[0])
    console.log("app.version: ",app.version)
    //console.log("version: ",version)
    if (version < 3) {
      console.warn('This plugin requires Vue 3')
    }

    const token = ref("")
    const user = ref("")
    const expire = ref(0)
    const authStatus = ref('login')
    //console.log(token)
    const API_URL="http://localhost:3003" 

    app.provide('AUTHKEY', '0000') // read only
    app.provide('authStatus', authStatus) //mutable
    app.provide('token', token) //mutable
    app.provide('user', user) //mutable
    app.provide('expire', expire) //mutable
    app.component('auth-access', AuthAccess);
    
    app.mixin({
      data(){
        return{
          API_URL:API_URL
        }
      },
      //created() {
        //console.log("printing from created.")
      //},
    })

    function login(alias,passphrase){
      //console.log(API_URL)
      const instance = axios.create({
        baseURL: API_URL
      });

      instance.interceptors.request.use(async (config) => {
        let begettoken = true;
          if (begettoken) {
            const response = await axios.get(API_URL+'/basetoken');
            //console.log(response.data.accessToken)
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          }
          return config;
      }, (error) => {
          return Promise.reject(error);
      });

      console.log(alias)
      console.log(passphrase)
      let data;
      return instance.post('/signin',{
        alias,
        passphrase
      })
        .then(function (response) {
          // handle success
          console.log(response);
          data = response.data
          if(data.api=="LOGIN"){
            user.value = data.user;
            token.value = data.token;
            const decoded = parseJwt(response.data.token);
            expire.value =decoded.exp;
            console.log(expire.value)
            authStatus.value ="auth"
          }
          return data
        })
        .catch(function (error) {
          // handle error
          authStatus.value ="unauth"
          console.log(error);
        })
    }

    app.provide('login',login)

    function register(alias,passphrase){
      //console.log(API_URL)
      const instance = axios.create({
        baseURL: API_URL
      });

      instance.interceptors.request.use(async (config) => {
        let begettoken = true;
          if (begettoken) {
            const response = await axios.get(API_URL+'/basetoken');
            //console.log(response.data.accessToken)
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          }
          return config;
      }, (error) => {
          return Promise.reject(error);
      });

      console.log(alias)
      console.log(passphrase)
      let data;
      return instance.post('/signup',{
        alias,
        passphrase
      })
        .then(function (response) {
          // handle success
          console.log(response);
          data = response.data
          return data
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
    app.provide('register',register)

    const logout = ()=>{
      console.log("logout is being called")
    }

    app.provide('logout',logout)
    /*
    import {inject} from 'vue';
    const logout = inject('logout')
    */

    const instance = axios.create({
      baseURL:API_URL
    , headers: {
      //'X-Custom-Header': 'foobar'
      "Content-Type": "application/json"
    }
    });

    instance.interceptors.request.use(async (config) => {
      const currentDate = new Date();
      if (expire.value * 1000 < currentDate.getTime()) {
        const response = await axios.get('/token');
        if(response.data.error){
          //log("NOT LOGIN")
          //setStatus('unauth')
          return config;
        }
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        //setToken(response.data.accessToken);
        token.value = response.data.accessToken
        const decoded = parseJwt(response.data.accessToken);
        //setName(decoded.name);
        //setExpire(decoded.exp);
        expire.value=decoded.exp
      }else{
        //config.headers.Authorization = `Bearer ${token}`;
        config.headers.Authorization = `Bearer ${token.value}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    const tokenJWT = ref(instance)
    app.provide('tokenJWT', tokenJWT) //mutable


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
