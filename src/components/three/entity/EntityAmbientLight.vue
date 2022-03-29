<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { AmbientLight } from 'troisjs';
const props = defineProps({
    objectid: String
  , dataType: String
  , name: String
  , visible: Boolean
  , parameters: Object
})
//console.log(props);
const parameters = props.parameters || {color:"#ffffff",intensity:1}
</script>

<template>
  <AmbientLight v-bind="parameters"/>
</template>