<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import CreateEntity from "./CreateEntity.vue";
import EntityObject from "./EntityObject.vue";
import EntityObjects from "./EntityObjects.vue";

const routes = {
  'create': CreateEntity,
  'entities': EntityObjects,
  'entity': EntityObject,
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
      ]
      ,viewSelect:this.view
    }
  },
  components:{
      
  },
  methods: {
    onChange(event) {
      console.log(event.target.value)
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
      <option value=""> Selet View </option>
      <option v-for="view in views" :key="view" > {{view}} </option>
    </select>
  </div>
  <div>
    <component :is="currentView" />
  </div>
</template>

<style>

</style>