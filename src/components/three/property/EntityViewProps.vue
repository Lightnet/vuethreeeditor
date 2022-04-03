<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import CreateEntity from "./CreateEntity.vue";
import EntityObject from "./EntityObject.vue";
import EntityObjects from "./EntityObjects.vue";
import EntityScenes from "./EntityScenes.vue";
import EntityPhysics from "./EntityPhysics.vue";
import EntitySceneConfig from "./EntitySceneConfig.vue";
import EntityRenderer from "./EntityRenderer.vue";

const routes = {
  'create': CreateEntity,
  'entities': EntityObjects,
  'entity': EntityObject,
  'scenes': EntityScenes,
  'physics': EntityPhysics,
  'scene': EntitySceneConfig,
  'renderer': EntityRenderer,
}

export default {
  props: {
    view: {
      type: String,
      default: ""
    }
  },
  data(){
    return {
      views:[
        "create"
        ,"entities"
        ,"entity"
        ,"scenes"
        ,"scene"
        ,"physics"
        ,"renderer"
      ]
      ,viewSelect:this.view
    }
  },
  components:{
      
  },
  methods: {
    onChange(event) {
      //console.log(event.target.value)
    }
  },
  computed: {
    currentView() {
      return routes[this.viewSelect || 'create'] || NotFound
    }
  },
};
</script>
<template>
  <div>
    <label>View</label>
    <select v-model="viewSelect" @change="onChange($event)">
      <option value=""> Select View </option>
      <option v-for="view in views" :key="view" > {{view}} </option>
    </select>
  </div>
  <div>
    <component :is="currentView" />
  </div>
</template>
<style>
</style>