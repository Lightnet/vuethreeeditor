<script>import { isEmpty } from "../../lib/helper.mjs"


export default {
  emits:['onDelete'],
  props:{
    type:{type:String,default:"info"},
    header:{type:String,default:""},
    //text:{type:String,default:"None"},
    autoClose:{type:Boolean,default:true},
    //color:{type:String,default:"info"},
    timeToDelete:{type:Number,default:300},
    timeToClose:{type:Number,default:1000 * 10},
  },
  data(){
    return {
      title:"",
      isClosing:false,
      timeoutId0:null,
      timeoutId1:null,
      timeoutId2:null
    }
  },
  watch:{
  },
  mounted(){
    if(isEmpty(this.header)){
      this.title = this.type;
    }else{
      //console.log("NOT EMPTU")
      this.title = this.header;
    }
    //console.log("MOUNT!!")
    if(this.autoClose){
      this.timeoutId0 = setTimeout(()=>{//close
        //this.isClosing=true;
        this.$emit('onDelete')
      }, this.timeToClose);
      this.timeoutId2 = setTimeout(()=>{//close event animation
        this.isClosing=true;
      }, this.timeToClose - this.timeToDelete);
    }
  },
  unmounted(){
    clearTimeout(this.timeoutId0);
    clearTimeout(this.timeoutId1);
    clearTimeout(this.timeoutId2);
  },
  computed: {
    checkClass(){
      let className = "";
      if(this.type == "info"){
        className += " info"
      }else if(this.type == "success"){
        className += " success"
      }else if(this.type == "warning"){
        className += " warning"
      }else if(this.type == "error"){
        className += " error"
      }else{
        className += " info"
      }

      if(this.isClosing){
        className += " slideOut"
      }else{
        className += " slideIn"
      }
      
      console.log(className)
      return className;
    }
  },
  methods:{
    hide(){
      //console.log("hide?")
      this.isClosing=true;
      this.timeoutId1 = setTimeout(()=>{
        this.$emit('onDelete')
      }, this.timeToDelete);
    },
  }
}
</script>
<template>
  <div class="notification" :class="checkClass">
    <button @click="hide" class="closeButton"> x </button>
    <div class="header">
      {{title}}
    </div>
    <slot></slot>
  </div>
</template>
<style>
.notification {
  max-width: 430px;
  max-height: 200px;
  overflow: hidden;
  padding: 12px 48px 12px 12px;
  z-index: 99;
  font-weight: bold;
  position: relative;

  transition: transform 0.3s ease-out;
}

.notification.slideOut {
  transform: translateX(150%);
  flex: 0;
}

.notification:not(:last-child) {
  margin-bottom: 8px;
}

.notification.info {
  background-color: #2196f3;
}

.notification.success {
  background-color: #4caf50;
}

.notification.warning {
  background-color: #ff9800;
}

.notification.error {
  background-color: #f44336;
}

.notification .closeButton {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
}

.notification,
.notification .closeButton {
  color: #fff;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0%);
  }
}

.notification.slideIn {
  animation-name: slideIn;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
}

.container {
  overflow: hidden;
  max-height: 200px;
  transition: max-height 0.3s ease-out;
}

.container:not(:last-child) {
  margin-bottom: 8px;
}

.container.shrink {
  max-height: 0;
}

</style>