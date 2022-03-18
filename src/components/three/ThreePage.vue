<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import AuthAccess from "../auth/AuthAccess.vue";
import Three from "./Three.vue";
import Editor from "./Editor.vue";

export default {
  components: {
      AuthAccess
    , Three
    , Editor
  }
}

</script>

<template>
  <Editor/>
</template>
<!--
  <AuthAccess>
    <Three/>
  </AuthAccess>
-->