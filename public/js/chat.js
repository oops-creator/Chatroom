const socket = io()
const messageTemplate = "<div><p> {{message}} </p></div>"
const messages = document.getElementById('messages')


socket.on('message'  ,(message)=>{

    
    mustacheMessage = {message:message}
    const html = Mustache.render(messageTemplate , mustacheMessage)
    messages.insertAdjacentHTML('beforeend'  , html)

    
})

document.getElementById('send-button').addEventListener('click' , (e)=>{
   e.preventDefault()
   const messageToSend =  document.getElementById('message-to-send').value
   console.log(messageToSend)
   socket.emit('message' , messageToSend)

   document.getElementById('message-to-send').value = ""
   document.getElementById('message-to-send').focus()

})