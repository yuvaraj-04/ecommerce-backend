const orderController = require("../Controllers/orderController")
const auth = require("../Middleware/auth")
const express = require("express")
const orderRouter=express.Router()
orderRouter.post("/",auth,orderController.createOrder)
orderRouter.get("/",auth,orderController.getOrder)

module.exports=orderRouter