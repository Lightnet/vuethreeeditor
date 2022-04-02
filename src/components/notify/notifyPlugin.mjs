import { ref } from "vue";
import { nanoid16 } from "../../lib/helper.mjs";

export const notifyPlugin = {
  install(app, options) {

    const notifies = ref([])

    app.provide('notifies', notifies) // read only

    function notify(options){
      // type
      // text
      // title
      // duration
      // speed
      // data?
      // position
      if(options.type == 'remove'){
        console.log("remove???",options.id)
        notifies.value = notifies.value.filter(item=>item.id !== options.id)
        console.log(notifies.value)
      }else{
        console.log(options)
        let item ={
            id:nanoid16()
          , type: options.type
          , header: options.header
          , text: options.text
        }
        notifies.value= [...notifies.value, item]
      }
    }
    app.provide('notify', notify) // read only

  }
}
export default notifyPlugin;