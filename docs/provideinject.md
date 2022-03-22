
https://vuejs.org/guide/components/provide-inject.html#inject


https://vuejs.org/guide/components/provide-inject.html#working-with-symbol-keys

Symbol
```js
// keys.js
export const myInjectionKey = Symbol()
```

```js
// in provider component
import { myInjectionKey } from './keys.js'

export default {
  provide() {
    return {
      [myInjectionKey]: {
        /* data to provide */
      }
    }
  }
}
```

```js
// in injector component
import { myInjectionKey } from './keys.js'

export default {
  inject: {
    injected: { from: myInjectionKey }
  }
}
```

```vue
<script setup>
import { myInjectionKey } from './keys.js'
const key = inject(myInjectionKey);
console.log(key)


</script>
```