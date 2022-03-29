<script setup>

import { inject } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { TokenInjectKey, UserInjectKey } from '../auth/AuthKeys.mjs';

const user = inject(UserInjectKey)
const token = inject(TokenInjectKey)

const router = useRouter()
const route = useRoute()
//console.log(router)
//console.log(route)

</script>
<template>
  <label>About</label><br/>
  <label>User:{{user}}</label>
</template>