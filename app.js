const express = require('express')
const path = require('path')
const hbs = require('hbs')


//--------------------------------------------------

const partialPath = path.join(__dirname , './templates/partials')
const pubDir = path.join(__dirname , './public')
const viewsPath = path.join(__dirname , './templates/views')
const app = express()

const port = process.env.port || 3010



//--------------------------------------------------


hbs.registerPartials(partialPath)
app.set('view engine' ,'hbs')
app.set('views' , viewsPath)
app.use(express.static(pubDir))


//--------------------------------------------------

app.get("" , (req , res)=>{
    res.render('index')
})



app.listen(port , ()=>{
    console.log(`The server is up and running on port ${port}`)
})















