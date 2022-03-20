
# Information:
  Work in progress and notes.


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