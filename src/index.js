
require('dotenv').config()
const express = require('express')
const path = require('path')
const bcryptjs = require('bcryptjs')
const mongoose = require('mongoose');


const app = express()
const PORT =process.env.PORT


//Use EJS as the view engine
app.set('view engine','ejs')


//static file
app.use(express.static("public"))




app.get('/', (req,res)=> {
    res.render('login')
})

app.get('/signup', (req,res)=> {
    res.render('signup')
})
 



app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)

})