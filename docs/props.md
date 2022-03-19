https://vuejs.org/guide/components/props.html





```js
export default {
  data() {
    return {
      post: {
        id: 1,
        title: 'My Journey with Vue'
      }
    }
  }
}
```

```js
<BlogPost v-bind="post" />
```
```js
<BlogPost :id="post.id" :title="post.title" />
```



```vue
<script>
  let entity={
      name:"test"
    , position:[0,0,0]
  }
</script>
<template>
  <EntityBox v-bind="entity" />
</template>
```

EntityBox.vue
```vue
<script setup>
const props = defineProps({
    name: String
  , position:Array
})
console.log(props);
</script>
```









