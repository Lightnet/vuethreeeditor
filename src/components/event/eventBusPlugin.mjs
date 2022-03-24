/*
  LICENSE: MIT
  Created by: Lightnet
  Information: note name call needs be alias if same function for vue.js
*/

// https://stackoverflow.com/questions/63471824/vue-js-3-event-bus

import { inject } from "vue";

class EventBusEvent extends Event {
  constructor({type, data}) {
    super(type)
    this.data = data
  }
}

class EventBus extends EventTarget {
  static _instance;

  static getInstance(){
    if (!this._instance) this._instance = new EventBus()
    return this._instance
  }

  emit(type, data){
    this.dispatchEvent(new EventBusEvent({type, data}))
  }
}

export const EmitInjectKey = Symbol();
export const OnInjectKey = Symbol();
export const OffInjectKey = Symbol();

export function useEmit(){
  return inject(EmitInjectKey);
}

export function useEmitOn(){
  return inject(OnInjectKey);
}

export function useEmitOff(){
  return inject(OffInjectKey);
}

//export function emit(type, data){//fail, does not work, emitKey return null
  //console.log("type")
  //console.log(type)
  //const emitKey = inject(EmitInjectKey);
  //console.log(emitKey)
  //emitKey(type, data)
//}

export function on(type, fn){
  const $on = inject(OnInjectKey);
  $on(type, fn)
}

export function off(type, fn){
  const $off = inject(OffInjectKey);
  $off(type, fn)
}

export const eventBusPlugin = {
  install(app, options) {

    const bus = EventBus.getInstance()

    function emit(type,args){
      bus.emit(type,args)
    }
    app.provide(EmitInjectKey, emit)

    function on(type, fn){
      bus.addEventListener(type, fn)
    }
    app.provide(OnInjectKey, on)

    function off(type, fn){
      bus.removeEventListener(type, fn);
    }
    app.provide(OffInjectKey, off)
  }
}
export default eventBusPlugin;