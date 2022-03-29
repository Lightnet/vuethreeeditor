import { defineComponent, inject } from 'vue'
import { PerspectiveCamera } from 'three'
// import { RendererInjectionKey, RendererInterface } from './Renderer'
// import Object3D from './Object3D'
import { bindObjectProp, bindProp, Object3D, RendererInjectionKey } from 'troisjs';

// export interface CameraSetupInterface {
//   renderer?: RendererInterface
//   camera: Camera
// }

export default defineComponent({
  name: 'PerspectiveCamera',
  // TODO: eventually extend Object3D
  extends: Object3D,
  props: {
    aspect: { type: Number, default: 1 },
    far: { type: Number, default: 2000 },
    fov: { type: Number, default: 50 },
    near: { type: Number, default: 0.1 },
    position: { type: Object, default: () => ({ x: 0, y: 0, z: 0 }) },
    lookAt: { type: Object, default: null },
  },
  setup(props) {
    const camera = new PerspectiveCamera(props.fov, props.aspect, props.near, props.far)
    //const camera = new Camera();
    const renderer = inject(RendererInjectionKey)
    renderer.camera = camera;
    bindProp(props, 'position', camera);

    //bindObjectProp(props, 'props', camera, true, cameraSetProp);

    return { renderer, camera }

  },
  created() {
    this.initObject3D(this.camera)
  }

  //props: {
    //props: { type: Object, default: () => ({}) },
  //},

  // inject: { renderer: RendererInjectionKey as symbol },

  // setup(): CameraSetupInterface {
  //   return {}
  // },

  //render() {
    //return this.$slots.default ? this.$slots.default() : []
  //},
})

export function cameraSetProp(camera, key, value, updateProjectionMatrix = true) {
  camera[key] = value
  if (updateProjectionMatrix) camera.updateProjectionMatrix()
}