const socket = io()
const messageTemplate = document.getElementById('message-template').innerHTML
const messages = document.getElementById('messages')


socket.on('message'  ,(message)=>{

    console.log(messageTemplate)
    mustacheMessage = {usermessage:message , username:'ehe'}
    const html = Mustache.render(messageTemplate , mustacheMessage)
    messages.insertAdjacentHTML('beforeend'  , html)
    console.log(html)

    
})

document.getElementById('send-button').addEventListener('click' , (e)=>{
   e.preventDefault()
   const messageToSend =  document.getElementById('message-to-send').value
   console.log(messageToSend)
   socket.emit('message' , messageToSend)

   document.getElementById('message-to-send').value = ""
   document.getElementById('message-to-send').focus()

})