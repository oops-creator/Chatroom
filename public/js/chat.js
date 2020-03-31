const socket = io()
const messageTemplate = document.getElementById('message-template').innerHTML
const messages = document.getElementById('messages')

function autoscroll(){

    const currentScroll = window.scrollY


    const maxScroll = Math.max( document.body.scrollHeight, 
        document.body.offsetHeight, 
        document.documentElement.clientHeight, 
        document.documentElement.scrollHeight, 
        document.documentElement.offsetHeight) - window.innerHeight

    if (maxScroll-currentScroll <=100) {
        window.scrollTo(0,100000000)
    }
}

socket.on('message'  ,(message)=>{

    console.log(messageTemplate)
    mustacheMessage = {usermessage:message , username:'ehe'}
    const html = Mustache.render(messageTemplate , mustacheMessage)
    messages.insertAdjacentHTML('beforeend'  , html)
    console.log(html)
    autoscroll()

    
})

document.getElementById('send-button').addEventListener('click' , (e)=>{
   e.preventDefault()
   const messageToSend =  document.getElementById('message-to-send').value
   console.log(messageToSend)
   socket.emit('message' , messageToSend)

   document.getElementById('message-to-send').value = ""
   document.getElementById('message-to-send').focus()
   autoscroll()


})