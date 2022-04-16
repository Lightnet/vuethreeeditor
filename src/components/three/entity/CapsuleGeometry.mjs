/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { Geometry } from "troisjs";
import { defineComponent } from "vue";
import { CapsuleGeometry } from "three";

function geometryComponent(name, props, createGeometry) {
  return defineComponent({
    name,
    extends: Geometry,
    props,
    methods: {
      createGeometry() {
        this.geometry = createGeometry(this);
        this.geometry.userData.component = this;
        this.$emit("created", this.geometry);
      }
    }
  });
}

export const props = {
  size: Number,
  radius: { type: Number, default: 1 },
  length: { type: Number, default: 1 },
  capSegments: { type: Number, default: 4 },
  radialSegments: { type: Number, default: 8 }
}

export function createGeometry(comp){
  if (comp.size) {
    return new CapsuleGeometry(comp.radius,comp.length,comp.capSegments,comp.radialSegments);
  }else{
    return new CapsuleGeometry(comp.radius,comp.length,comp.capSegments,comp.radialSegments);
  }
}

export default geometryComponent('CapsuleGeometry', props, createGeometry)