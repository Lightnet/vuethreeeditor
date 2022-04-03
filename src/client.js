/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://vuejs.org/guide/components/provide-inject.html#app-level-provide
// https://docs.w3cub.com/vue~3/api/global-api
// https://morioh.com/p/d5f7657ee12d
//import { TroisJSVuePlugin } from 'troisjs';
import "./styles/globals.css"
import { createApp } from 'vue'
import App from './components/App.vue'
import authPlugin from './components/auth/authPlugin.mjs'
import entityPlugin from './components/three/context/entityPlugin.mjs';
import router from "./components/router"
import eventBusPlugin from "./components/event/eventBusPlugin.mjs"
import notifyPlugin from "./components/notify/notifyPlugin.mjs"

const app = createApp(App);
app.config.unwrapInjectedRef = true
app.config.globalProperties.foo="bar";
//app.use(TroisJSVuePlugin);
app.use(authPlugin);
app.use(entityPlugin);
app.use(eventBusPlugin);
app.use(notifyPlugin);
app.use(router);

/*
const app = createApp({
  data() {
    return {
      count: 0
    }
  },
  render: h => h(App)
})
*/

app.provide(/* key */ 'message', /* value */ 'hello!')
//app.provide(/* key */ 'status', /* value */ 'init')

app.mount('#app');
