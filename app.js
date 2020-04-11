const express = require('express')
const path = require('path')
const http = require('http')
const hbs = require('hbs')
const socketio = require('socket.io')
const {addUser, removeUser, getUser, getUsersInRoom}  = require('./src/user')


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
app.use(express.urlencoded());
app.use(express.json());


//--------------------------------------------------

app.get("" , (req , res)=>{
    res.render('login' , {title:'Chatroom'})
})

app.post("/chat" , (req , res)=>{
    console.log(req.body)
    res.render('index')
    
})

app.get("/chat" , (req , res)=>{

    res.render('index',{title:'Chatroom'})
})

io.on('connection' , (socket)=>{
    console.log('New client connected')

    socket.on('join' , ({username , room} , callback)=>{
        socket.join(room)
        const {error , user} = addUser({ id:socket.id , username , room})
        if(error){
            return callback(error);
            

        }
        
        callback();

    })

    socket.on('message' , (receivedMessage , username , room)=>{
        console.log(receivedMessage)
        io.to(room).emit('message' , receivedMessage, username)
    })

    socket.on('disconnect' , ()=>{
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('notif' , `${user.username} has left`)
        }
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















