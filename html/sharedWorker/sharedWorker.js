
const portList = []

self.addEventListener('connect',(e)=>{
  const port = e.ports[0]
  port.addEventListener('message',(e)=>{
    portList.forEach(port=>{
      port.postMessage(e.data)
    })
  })
  port.start()
  portList.push(port)
})



