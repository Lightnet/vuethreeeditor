<script setup>

import { inject } from 'vue';
import { useRouter, useRoute } from 'vue-router'

const user = inject('user')
const token = inject('token')

const router = useRouter()
const route = useRoute()
//console.log(router)
//console.log(route)

</script>
<template>
  <h1>About</h1>
</template>