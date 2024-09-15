const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/blog")

//check database connected or not
connect.then(()=>{
    console.log("Databas connected succesfuly")
})
.catch(()=>{
    console.log("Databas cannot be")
})

//Create a schema

const LoginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})
  
//Collection part 
const collection = new mongoose.model("users",LoginSchema);

module.exports = collection