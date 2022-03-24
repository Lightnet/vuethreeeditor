https://github.com/developit/mitt


https://stackoverflow.com/questions/63471824/vue-js-3-event-bus

```vue
<!-- Parent -->
<script setup>
  import { defineEmit } from 'vue'
  const emit = defineEmit(['selected'])
  const onEmit = (data) => console.log(data)
</script>

<template>
    <btnList
        v-for="x in y"
        :key="x"
        :emit="emit"
        @selected="onEmit"
    />
</template>
```

```vue
<!-- Children (BtnList.vue) -->
<script setup>
  import { defineProps } from 'vue'
  const props = defineProps({
      emit: Function
  })
</script>

<template>
    <button v-for="x in 10" :key="x" @click="props.emit('selected', x)">Click {{ x }}</button>
</template>
```



