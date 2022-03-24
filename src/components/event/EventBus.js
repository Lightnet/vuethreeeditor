

// https://stackoverflow.com/questions/63471824/vue-js-3-event-bus
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

export default EventBus.getInstance()