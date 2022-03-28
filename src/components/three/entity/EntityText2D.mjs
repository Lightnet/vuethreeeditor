import { defineComponent } from 'vue';
import { Object3D } from 'troisjs';
import { Text } from 'troika-three-text';
export default defineComponent({
  name: 'Text2D',
  extends: Object3D,
  setup() {
    const text2D = new Text();
    text2D.text = 'Hello world!'
    text2D.fontSize = 0.2
    //text2D.position.z = -2
    text2D.color = 0x9966FF
    return {
      text2D,
      //group: new Group(),
      //text2D: new Text(),
    }
  },
  created() {
    //this.initObject3D(this.group)
    this.initObject3D(this.text2D)
  },
  //__hmrId: 'Group',
  __hmrId: 'text2D',
})