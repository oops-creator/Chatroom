const express = require('express')
const path = require('path')
const http = require('http')
const hbs = require('hbs')
const socketio = require('socket.io')


//--------------------------------------------------

const partialPath = path.join(__dirname , './templates/partials')
const pubDir = path.join(__dirname , './public')
const viewsPath = path.join(__dirname , './templates/views')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.port || 8000



//--------------------------------------------------


hbs.registerPartials(partialPath)
app.set('view engine' ,'hbs')
app.set('views' , viewsPath)
app.use(express.static(pubDir))


//--------------------------------------------------

app.get("" , (req , res)=>{
    res.render('login')
})

app.get("/chat" , (req , res)=>{
    res.render('index')
})

io.on('connection' , (socket)=>{
    console.log('New client connected')

    socket.on('message' , (receivedMessage)=>{
        console.log(receivedMessage)
        io.emit('message' , receivedMessage)
    })

})






//---------------------------------------------------
server.listen(port , ()=>{
    console.log(`The server is up and running on port ${port}`)
})


function shutdown() {
    server.close(function onServerClosed (err) {
      if (err) {
        console.error(err)
        process.exit(1)
      }
    })
}

process.on('SIGINT', function onSigterm () {
    shutdown()
  })















