












https://vuejs.org/guide/essentials/template-syntax.html#directives

https://vuejs.org/guide/extras/render-function.html#declaring-render-functions
https://www.youtube.com/watch?v=BZScSgvBU54



https://vuejs.org/guide/extras/render-function.html#custom-directives


```js
import { h, withDirectives } from 'vue'

// a custom directive
const pin = {
  mounted() { /* ... */ },
  updated() { /* ... */ }
}

// <div v-pin:top.animate="200"></div>
const vnode = withDirectives(h('div'), [
  [pin, 200, 'top', { animate: true }]
])
```

```js
function MyComponent(props, context) {
  // ...
}
```

```js
function MyComponent(props, context) {
  // ...
}
```
https://vuejs.org/guide/reusability/custom-directives.html#directive-hooks

```js
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```
```js
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```
https://vuejs.org/api/sfc-script-setup.html#using-custom-directives


Globally registered custom directives just work as normal. Local custom directives don't need to be explicitly registered with <script setup>, but they must follow the naming scheme vNameOfDirective:

```vue
<script setup>
const vMyDirective = {
  beforeMount: (el) => {
    // do something with the element
  }
}
</script>
<template>
  <h1 v-my-directive>This is a Heading</h1>
</template>
```
```vue
<script setup>
import { myDirective as vMyDirective } from './MyDirective.js'
</script>
```

```vue
```

```vue
```

```vue
```

```vue
```
















