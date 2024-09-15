
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
        //hash password
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(data.password, saltRounds)

        data.password = hashedPassword
        const userdata = await collection.insertMany(data);
        console.log(userdata)
    }
})

app.post("/login", async (req,res)=>{
    try {
        const check = await collection.findOne({name : req.body.username})
        if(!check){
            res.send("This Username does not exist")
        }
        //compare the password hash between database and user input
        const isPasswordMatch = await bcryptjs.compare(req.body.password, check.password);
        if(isPasswordMatch) {
            res.render("home")
        } else {
            req.send("wrong password")
            }
    }
    catch (error) {
        res.send("wrong password")
    }
    })




app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)

})