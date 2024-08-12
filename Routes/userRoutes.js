const userController = require("../Controllers/userController")
const express = require("express")
const userrouter = express.Router()
userrouter.get("/",userController.getUser)
userrouter.post("/",userController.createUser)
userrouter.post("/login",userController.login)

module.exports=userrouter