https://learnvue.co/2021/05/explaining-the-new-script-setup-type-in-vue-3-major-takeaways-from-the-rfc/
https://www.netlify.com/blog/understanding-defineprops-and-defineemits-in-vue-3.2

https://blog.ninja-squad.com/2021/09/30/script-setup-syntax-in-vue-3/
https://www.youtube.com/watch?v=BZScSgvBU54


https://stackoverflow.com/questions/67918363/how-to-use-render-function-in-script-setup-vue3

render
```vue
<script lang="tsx" setup>
  import { h } from 'vue';

  const render = () => {//pass
    return h('div', []);
  };

  const jsxNode = () => {//fail
    return <div> text </div>;
  };
</script>
<template>
  <render />
  <jsxNode />
</template>
```

https://vuejs.org/guide/extras/render-function.html#creating-vnodes
```vue
<script setup>
import { h } from 'vue'

const vnode = h(
  'div', // type
  { id: 'foo', class: 'bar' }, // props
  [
    /* children */
  ]
)
</script>
```

```vue
<script lang="tsx" setup>
const renderTest = () => {//pass
  let ltest = h('label',"test");
  return h('div', [ltest]);
};
// <renderTest />
const renderTest2 = () => {//pass
  return `<label> Projects: </label>`;
};

//const renderTest3 = () => {//fail
  //return <label> Projects: </label>;
//};
</script>
<template>
  <renderTest />
  <renderTest2 />
</template>
```














