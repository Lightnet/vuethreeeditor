<script>
// https://www.youtube.com/watch?v=0JY8O1LBA7U
// Vue.js Advanced Data Provider Component Patterns Explained
import { defineComponent, ref } from "vue";

export default defineComponent({
  props:["url"],
  setup(props,ctx){
    let res = ref("");
    let loading = ref(true);

    fetch(props.url)
      .then(response=>response.json())
      .then(response=>{
        res.value = response;
        loadding.value=false;
      })
    return ()=>ctx.slots.default({res: res.value,loading:loading.value})
  }
})
</script>