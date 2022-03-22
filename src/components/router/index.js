

// https://www.digitalocean.com/community/tutorials/how-to-navigate-between-views-with-vue-router
import {createRouter, createWebHistory} from "vue-router";

import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import SignIn from '../auth/SignIn.vue';
import SignUp from '../auth/SignUp.vue';
import SignOut from '../auth/SignOut.vue';
import EditorPage from '../three/EditorPage.vue';
import NotFound from '../pages/NotFound.vue';
//import AccessTest from '../auth/AccessTest.vue';


const routes = [
  {path:"/",name:"Home",component:Home},
  {path:"/about",name:"About",component:About},
  {path:"/editor",name:"Editor",component:EditorPage},
  {path:"/signin",name:"Sign In",component:SignIn},
  {path:"/signup",name:"Sign Up",component:SignUp},
  {path:"/signout",name:"Sign Out",component:SignOut},
  {path:'/:catchAll(.*)*',name:"PageNotFound",component:NotFound},
]

const router = createRouter({
  history:createWebHistory(),
  routes
})

export default router;