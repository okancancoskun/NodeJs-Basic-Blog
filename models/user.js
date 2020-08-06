const mongoose = require("mongoose");
const Product = require("./product");

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
   
    
})


module.exports = mongoose.model("User",userSchema);