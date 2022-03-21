import {createRouter, createWebHistory} from "vue-router";

import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import NotFound from '../pages/NotFound.vue';
import SignIn from '../auth/SignIn.vue';
import SignUp from '../auth/SignUp.vue';
import SignOut from '../auth/SignOut.vue';
import ThreePage from '../three/ThreePage.vue';
import AccessTest from '../auth/AccessTest.vue';


const routes = [
  {path:"/",name:"Home",component:Home},
  {path:"/about",name:"About",component:About},
  {path:"/editor",name:"Editor",component:ThreePage},
  {path:"/signin",name:"Sign In",component:SignIn},
  {path:"/signup",name:"Sign Up",component:SignUp},
  {path:"/signout",name:"Sign Out",component:SignOut},
]

const router = createRouter({
  history:createWebHistory(),
  routes
})

export default router;