<script>
// https://github.com/troisjs/trois/blob/master/src/core/Scene.ts
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
import { RendererInjectionKey, SceneInjectionKey } from 'troisjs'

export default {
  comments:{

  },
  inject:{
      renderer:{from:RendererInjectionKey}
    , scene:{from:SceneInjectionKey}
  },
  data() {
    return {
      
    }
  },
  mounted() {
    console.log("vuejs default")
    console.log(this.renderer.three)
    console.log(this.renderer.three.renderer.domElement)
    console.log(this.scene)
  }
}
</script>
<template>
</template>
