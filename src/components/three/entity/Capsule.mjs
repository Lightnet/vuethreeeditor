/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { Mesh } from "troisjs";
import { defineComponent } from "vue";

function meshComponent(name, props, createGeometry) {
  return defineComponent({
    name,
    extends: Mesh,
    props,
    created() {
      this.createGeometry();
      this.addGeometryWatchers(props);
    },
    methods: {
      createGeometry() {
        this.geometry = createGeometry(this);
      }
    }
  });
}

import { props, createGeometry } from "./CapsuleGeometry.mjs";

export default meshComponent('Capsule', props, createGeometry)