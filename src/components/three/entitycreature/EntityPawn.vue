<script>
//Testing
// https://vuejs.org/guide/typescript/overview.html#general-usage-notes
// might need to create class from defineComponent 
/*
  character:
    - player and A.I movement and actions
    - stats health points
    - equipment
    - alive/death
    - camera
*/

import { defineComponent } from 'vue'

export default defineComponent({
  // type inference enabled
  props: {
    name: String,
    //msg: { type: String, required: true }
  },
  data() {
    return {
      //count: 1
    }
  },
  mounted() {
    //this.name // type: string | undefined
    //this.msg // type: string
    //this.count // type: number
  }
})

</script>
<template>

</template>