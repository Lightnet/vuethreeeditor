# bus emit:
  In vue 3.0 event bus is remove $on, $off. Due to overload or not never use.

  There are different way to handle bus. Since the Teleport element. As well provide, inject, ref and other features.

```js
function testcall1(){
  console.log("test");
}
provide('calltest',testcall1)
```
```js
const callme = inject('calltest')
callme();
```

  It is possible to change the code a bit.

```js
function emit(type, args){}
provide('emit',emit)

function on(type, data){}
provide('on',emit)

function off(type, data){  }
provide('off',off)
```

```js
const emit = inject('emit')
emit('test');
```

```js
const on = inject('on')
on('test',()=>{

});
```

But it need to remove listen in case on unmount it need to clear listen. It can be turn into plugin.



```vue
<template>
  <Teleport to="body">
    <template v-if="isOpen">
      <div ref="modal" id="MODAL" v-bind:style="{position:'absolute',left:'0px',top:'0px',backgroundColor:'white',height:'200px',width:'200px',zIndex:2}" >
        <div ref="modalDrag" style="backgroundColor:darkgray;" >
          <button @click="onClose"> Close</button>
        </div>
        <div>
          Hello World! <button @click="clickTest"> Test Root </button>
        </div>
      </div>
    </template>
  </Teleport>
</template>
```



https://stackoverflow.com/questions/63471824/vue-js-3-event-bus
https://www.npmjs.com/package/mitt
```js
// using ES6 modules
import mitt from 'mitt'

// using CommonJS modules
var mitt = require('mitt')
```

- https://stackoverflow.com/questions/63622303/vue-js-3-this-root-on-is-not-a-function
- https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits

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