const cartController = require("../Controllers/cartController")
const auth = require("../Middleware/auth")
const express = require("express")
const cartrouter = express.Router()
cartrouter.get("/",auth,cartController.getCart)
cartrouter.post("/",auth,cartController.createCart)
cartrouter.post("/delete/:id",auth,cartController.deleteCart)

module.exports=cartrouter