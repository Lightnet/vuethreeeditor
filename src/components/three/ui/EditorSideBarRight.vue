<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import EntityViewProps from "../property/EntityViewProps.vue"

</script>

<template>
  <div class="sidebarright">
    <EntityViewProps :view="'entity'"/>
  </div>
</template>
<!-- 
<EntityViewProps :view="'entities'"/>
-->
<style scoped>
.sidebarright {
  position: fixed;
  top:20px;
  right: 0px;
  height: calc(100% - 40px);
  width: 200px;
  background: gray;
}
</style>