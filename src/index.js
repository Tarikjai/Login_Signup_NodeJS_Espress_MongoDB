
require('dotenv').config()
const express = require('express')
const path = require('path')
const bcryptjs = require('bcryptjs')
const collection = require("./config")
const app = express()


const PORT =process.env.PORT




// convert data into json format
app.use(express.json());

// 
app.use(express.urlencoded({extended: false}))


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
 
// Register User
app.post("/signup", async (req,res)=>{
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    const existingName = await collection.findOne({name:data.name})
    if (existingName){
        res.send("User already existe, try an other username")
    } else {
        const userdata = await collection.insertMany(data);
        console.log(userdata)
    }
    
    

})


app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)

})