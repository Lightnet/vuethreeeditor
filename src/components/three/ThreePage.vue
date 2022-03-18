<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import AuthAccess from "../auth/AuthAccess.vue";
//import Three from "./Three.vue";
import Editor from "./Editor.vue";
import ClientOnly from '../helper/ClientOnly.vue';

export default {
  components: {
      AuthAccess
    , Editor
    , ClientOnly
  }
}
</script>

<template>
    <Editor/>
</template>
<!--
<ClientOnly>
</ClientOnly>
<Editor/>
  <AuthAccess>
    <Three/>
  </AuthAccess>
-->