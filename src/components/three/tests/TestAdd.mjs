import { defineComponent } from 'vue'


export default defineComponent({
  created() {
    this._parent = this.getParent()
  },
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
      console.log("TEST ADD ....?");
      //this.addToParent(o)
      //this.cannon.addMesh(o)
    },
    remove(o) {
      console.log("TEST REMOVE ....?");
      //this.removeFromParent(o)
      //this.cannon.removeMesh(o)
    },
    getParent() {
      let parent = this.$parent
      while (parent) {
        if (parent.add) return parent
        parent = parent.$parent
      }
      return false
    },
    addToParent(o) {
      if (this._parent) {
        this._parent.add(o)
        return true
      }
      return false
    },
    removeFromParent(o) {
      if (this._parent) {
        this._parent.remove(o)
        return true
      }
      return false
    },
  },
  render() {
    return this.$slots.default ? this.$slots.default() : []
  },
})