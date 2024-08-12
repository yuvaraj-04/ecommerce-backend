const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const userschema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    Role:{
        type:String,
        required:true,
        enum:['Admin','User']
    }
})
userschema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next()
})
const User = new mongoose.model("User",userschema)
module.exports=User