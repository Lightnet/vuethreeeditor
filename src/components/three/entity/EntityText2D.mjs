import { defineComponent, watchEffect } from 'vue';
import { Object3D } from 'troisjs';
import { Text } from 'troika-three-text';
export default defineComponent({
  name: 'Text2D',
  extends: Object3D,
  props:{
    text:{type:String, default:"None"},
    color:{type:String, default:"#9966FF"}
  },
  setup(props) {
    const text2D = new Text();
    text2D.text = props.text;
    text2D.fontSize = 0.2
    //text2D.position.z = -2
    text2D.color = props.color;
    watchEffect(()=>{
      text2D.text = props.text;
      text2D.sync()
    });
    return {
      text2D,
    }
  },
  created() {
    this.initObject3D(this.text2D)
  },
  //__hmrId: 'Group',
  __hmrId: 'text2D',
})