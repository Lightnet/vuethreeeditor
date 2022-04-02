import { defineComponent } from 'vue'


export default defineComponent({
  mounted() {
    //console.log(this.renderer)
    //console.log(this.scene)
    //this.renderer.onBeforeRender(this.step)
  },
  unmounted() {
    //this.renderer.offBeforeRender(this.step)
  },
  methods: {
    add(o) {
      console.log("ADD ....?");
      //this.addToParent(o)
      //this.cannon.addMesh(o)
    },
    remove(o) {
      //this.removeFromParent(o)
      //this.cannon.removeMesh(o)
    },
  },
  render() {
    return this.$slots.default ? this.$slots.default() : []
  },
})