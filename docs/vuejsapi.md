
# Information:
  Work in progress and notes.

  Vue js version 3.x. Note some functions are remove due global access as it is discourage for event trigger and functions. Using the Vue new features with different ways of using global variables and functions. One reason is conflict variables if there plugins that same variables.

  By using the vue provide, inject and symbol to create app. The reason need for symbol is unqiue key to access variable or function to get the current instance variable or function.

  Vue create instance application like creating sandbox.

## Provide, Inject and Symbol"
AppKey.js
```js
export const fooInjectKey = Symbol();
```

App.vue
```vue
<script setup>
import { provide, ref } from "vue";
import {fooInjectKey} from "./AppKey.js"

const foo = ref("bar");
provide(fooInjectKey,foo);
console.log(foo)

</script>
```

Child.vue
```vue
<script setup>
import {inject} from "vue";
import {fooInjectKey} from "./AppKey.js"
const foo = inject(fooInjectKey);
console.log(foo)

</script>
```

## global and root access:
  It is best not to create global variables as it can be easy modified.

  With the version 3 setup is to setup without need to add more config. As there are other setup as well. It depend on the coding.


Client.js
```js
import { createApp } from 'vue'
import App from './components/App.vue'
const app = createApp(App); // create instance app
app.config.globalProperties.foo="bar";
app.mount('#app');
```

Another way is provide and inject.

AppKey.js
```js
export const rootfooInjectKey = Symbol();
```
App.vue
```vue
<script setup>
import { rootfooInjectKey } from "./AppKey.js"
import {provide, getCurrentInstance } from 'vue';
const app = getCurrentInstance();
const rootFoo = ref('rootbar');

provide(rootfooInjectKey,rootFoo); //app root

console.log(app.appContext)//get this current app context
const foo = app.appContext.config.globalProperties.foo
</script>
```

child.js
```vue
<script setup>
import { rootfooInjectKey } from "./AppKey.js"
import {inject} from "vue";

const rootFoo = inject(rootfooInjectKey);
console.log(rootFoo)

const foo = inject('foo');
console.log(foo)

</script>
```
## Event Bus: (wip)


Client.js
```js
import { createApp } from 'vue'
import App from './components/App.vue'
const app = createApp(App);
//app.provide(/* key */ 'foo', /* value */ 'bar')
app.mount('#app');
```

AppKey.js
```js
export const eventInjectKey = Symbol();
```
App.vue
```vue
<script setup>
import { eventInjectKey } from "./AppKey.js"
import {provide, getCurrentInstance } from 'vue';
const app = getCurrentInstance();
//const rootFoo = ref('rootbar');
//provide(eventInjectKey,rootFoo); //app root

</script>
```





## vue defineComponent:
  Another ways using the class setup.

```js
import { defineComponent } from "vue"
export default defineComponent({
  name: "layout",
  emits: ['showsidebar'],
  setup(props, { emit }) {
    const showSidebar = ref(true);
    return {

    };
  },
  data() {

  },
});
```
- https://stackoverflow.com/questions/65844419/vue-composition-api-defining-emits

# ref:
- https://vuejs.org/api/reactivity-advanced.html#toraw
```js
const foo = {}
const reactiveFoo = reactive(foo)
console.log(toRaw(reactiveFoo) === foo) // true
```

# Tips:
  Never use global varables as it can be edit.

```js
  app.config.globalProperties.hello="world"
```
- https://stackoverflow.com/questions/63100658/add-global-variable-in-vue-js-3

```vue
<script setup>
// can not access global var once setup tag is added.
//console.log(this.myvar) //does not work
</script>
```

```vue
<script setup>
import { getCurrentInstance } from 'vue';
const app = getCurrentInstance();
const myvar = app.appContext.config.globalProperties.myvar

</script>
```

- https://github.com/vuejs/Discussion/issues/292
- https://stackoverflow.com/questions/58097556/how-to-convert-a-vue-wrapped-object-to-a-normal-object
```js
//remove link ref to normal object json
parameters:JSON.parse(JSON.stringify(parameters.value))
```

https://forum.vuejs.org/t/how-to-use-globalproperties-in-vue-3-setup-method/108387/4

```js
export const entityPlugin = {
  install(app, options) {
    //const app = Vue.createApp({})
    app.config.globalProperties.$Progress = () => {}
  }
}
```

```vue
<script setup>
    import { getCurrentInstance } from 'vue'

    const app = getCurrentInstance()
    const progressBar = app.appContext.config.globalProperties.$Progress

    progressBar.start()
</script>
```

https://medium.com/@certosinolab/using-event-bus-in-vue-js-3-425aae8c21a6
https://forum.vuejs.org/t/how-to-use-globalproperties-in-vue-3-setup-method/108387/4
https://stackoverflow.com/questions/63471824/vue-js-3-event-bus
https://learnvue.co/2021/05/a-guide-to-vue-emit-how-to-emit-custom-events-in-vue/


https://www.npmjs.com/package/tiny-emitter


https://masteringjs.io/tutorials/vue/v-on

```
v-on:keyup
v-on:mouseenter
v-on:focus
v-on:change

@ Shorthand
Vue has a convenient shorthand for v-on: the @ symbol. For example, @click is functionally equivalent to v-on:click. Using @ saves you a few keystrokes, but v-on is more readable for people who aren't familiar with Vue.
```