<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name:"Blank",
  props:[],
  setup() {
    let name = "John";

    return {
      name
    }
  },
  methods:{

  }
})
</script>
<template>
  <label>Hello</label>
</template>
<style scoped>

</style>
