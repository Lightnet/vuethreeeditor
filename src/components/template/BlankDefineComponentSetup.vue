<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name:"Blank",
  props:[],
  setup(props) {
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
  <label>Hello,{{name}}</label>
</template>
<style scoped>

</style>
