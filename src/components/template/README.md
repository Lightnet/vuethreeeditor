
# Information
check on the right page to see name function()

https://vuejs.org/api/reactivity-core.html
```js
ref()
computed()
reactive()
readonly()
watchEffect()
watchPostEffect()
watchSyncEffect()
watch()
```
https://vuejs.org/api/reactivity-utilities.html
```js
isRef()
unref()
toRef()
toRefs()
isProxy()
isReactive()
isReadonly()
```
https://vuejs.org/api/reactivity-advanced.html
```js
shallowRef()
triggerRef()
customRef()
shallowReactive()
shallowReadonly()
toRaw()
markRaw()
effectScope()
getCurrentScope()
onScopeDispose()
```
https://vuejs.org/api/composition-api-lifecycle.html

```js
onMounted()
onUpdated()
onUnmounted()
onBeforeMount()
onBeforeUpdate()
onBeforeUnmount()
onErrorCaptured()
onActivated()
onDeactivated()
```
https://vuejs.org/api/composition-api-dependency-injection.html

provide()
```vue
<script setup>
import { ref, provide } from 'vue'
// provide static value
provide('foo', 'bar')
// provide reactive value
const count = ref(0)
provide('count', count)
</script>
```

inject()
```vue
<script setup>
import { inject } from 'vue'

import { inject } from 'vue'
import { fooSymbol } from './injectionSymbols'

// inject static value with default
const foo = inject('foo')

// inject reactive value
const count = inject('count')

// inject with default value
const bar = inject('foo', 'default value')

// inject with default value factory
const baz = inject('foo', () => new Map())

// inject with function default value, by passing the 3rd argument
const fn = inject('function', () => {}, false)


</script>
```








```js
// object
const foo = {}
//ref object
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true

//ref object
console.log(reactiveFoo))

//return to object
console.log(toRaw(reactiveFoo))
```

https://vuejs.org/api/sfc-script-setup.html
```vue
<script setup>
import Foo from './Foo.vue'
import Bar from './Bar.vue'
</>

<template>
  <component :is="Foo" />
  <component :is="someCondition ? Foo : Bar" />
</template>
```

Components using <script setup> are closed by default