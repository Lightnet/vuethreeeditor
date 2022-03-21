https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits

# Note:
- when using cap letter it need to have "-"

Ex. 
```js
const emit = defineEmits(['loadProject']);
emit('loadProject',"test")
```

```vue

<template>
//component //event name // function
<Projects @load-project="loadProject"/>
</template>
```

top (parent)

```vue
<script setup>
import Projects from  "./Projects.vue"
function loadProject(id){
  console.log(id)
  console.log("loadproject",id)
}

</script>
<template>
  <Projects @load-project="loadProject"/>
</template>
```

below (child)
```vue
<script setup>
const emit = defineEmits(['loadProject']);
function loadProject(id){
  console.log(id)
  emit('loadProject',id)
}
</script>

<template>
  <button @click="loadProject(project.id)"> Load </button>
</template>
```