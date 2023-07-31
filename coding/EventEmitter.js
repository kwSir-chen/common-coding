class EventEmitter{
  constructor(){}
  events = {}
  on(eventName,fn){
    if(!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(fn)
  }
  off(eventName,fn){
    if(this.events[eventName]){
      let eventArr = this.events[eventName]
      for(let i=0;i<eventArr.length;i++){
        if(eventArr[i] === fn){
          eventArr.splice(i,1)
          break
        }
      }
    }
  }
  emit(eventName,...args){
    let eventArr = this.events[eventName] || []
    for(let e of eventArr) {
      e.apply(this,args)
    }
  }
}

let eventEmitter = new EventEmitter()

eventEmitter.on('pi',function(){console.log(this.name)})

eventEmitter.name = 'fang pi'

eventEmitter.emit('pi')

eventEmitter.emit('pi')

eventEmitter.off('pi')

