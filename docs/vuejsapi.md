
# Information:
  Work in progress and notes.

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
```vue
<script setup>
// can not access global var once setup tag is added.
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
</>


```