const productController = require("../Controllers/productController")
const auth = require("../Middleware/auth")
const express = require("express")
const productrouter = express.Router()
productrouter.get("/",productController.getProducts)
productrouter.post("/",auth,productController.createProducts)
module.exports=productrouter