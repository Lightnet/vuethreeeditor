class EntityConfig {
  static _instance;

  static getInstance(){
    if (!this._instance) this._instance = new EntityConfig()
    console.log(this._instance)
    return this._instance
  }

  constructor(){
    this.autoSave=false;  
  }

  setSave(bool) {
    this.autoSave=bool; 
  }

}

export default EntityConfig.getInstance();