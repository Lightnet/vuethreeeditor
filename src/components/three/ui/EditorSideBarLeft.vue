<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import EntityViewProps from "../property/EntityViewProps.vue"

//create
</script>

<template>
  <div class="sidebarleft">
    <EntityViewProps :view="'create'"/>
  </div>
</template>

<style>
.sidebarleft {
  position: fixed;
  top:20px;
  left: 0px;
  height: calc(100% - 40px);
  width: 200px;
  background: gray;
}
</style>