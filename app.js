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

// app.get("" , (req , res)=>{
//     res.render('index')
// })


// io.on('connection' , (socket)=>{
//     console.log('New client connected')
//     socket.emit('message' , 'Welcome')
//     socket.on('message' , (retval)=>{
//         console.log(retval)
//     })

// })






//---------------------------------------------------
server.listen(port , ()=>{
    console.log(`The server is up and running on port ${port}`)
})















