

// https://vuejs.org/guide/components/provide-inject.html#app-level-provide
// https://docs.w3cub.com/vue~3/api/global-api
// https://morioh.com/p/d5f7657ee12d
//import { TroisJSVuePlugin } from 'troisjs';
import { createApp } from 'vue'
import App from './components/App.vue'
import authPlugin from './components/auth/authPlugin.mjs'

const app = createApp(App);
app.config.unwrapInjectedRef = true
//app.use(TroisJSVuePlugin);
app.use(authPlugin);

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
