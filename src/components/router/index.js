

// https://www.digitalocean.com/community/tutorials/how-to-navigate-between-views-with-vue-router
import {createRouter, createWebHistory} from "vue-router";

import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import SignIn from '../auth/SignIn.vue';
import SignUp from '../auth/SignUp.vue';
import SignOut from '../auth/SignOut.vue';
import EditorPage from '../three/EditorPage.vue';
import NotFound from '../pages/NotFound.vue';
import ThreeCannonPage from "../three/ThreeCannonPage.vue"
import EditorLayoutTest from "../three/ui/EditorLayoutTest.vue"
import ThreePage from "../three/ThreePage.vue"
import Three2 from "../three/Three2.vue"
import TestLab from "../pages/TestLab.vue"
//import AccessTest from '../auth/AccessTest.vue';

const routes = [
  {path:"/",name:"Home",component:Home},
  {path:"/about",name:"About",component:About},
  {path:"/editor",name:"Editor",component:EditorPage},
  {path:"/threecannon",name:"ThreeCannon",component:ThreeCannonPage},
  {path:"/three",name:"Three",component:ThreePage},
  {path:"/three2",name:"Three2",component:Three2},
  {path:"/signin",name:"Sign In",component:SignIn},
  {path:"/signup",name:"Sign Up",component:SignUp},
  {path:"/signout",name:"Sign Out",component:SignOut},
  {path:"/testlab",name:"Test Lab",component:TestLab},
  {path:"/editorlayout",name:"Test Lab",component:EditorLayoutTest},
  {path:'/:catchAll(.*)*',name:"PageNotFound",component:NotFound},
]

const router = createRouter({
  history:createWebHistory(),
  routes
})

export default router;