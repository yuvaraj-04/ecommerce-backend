const express =require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors)
const productRoutes = require("../backend/Routes/productRoutes")
const userRoutes = require("../backend/Routes/userRoutes")
const mongoose = require("mongoose");
const cartRoutes = require("./Routes/cartRoutes")
const orderRoutes = require("./Routes/orderRoutes")
const port = 3000;
mongoose.connect("mongodb+srv://yuvi:yuvi@cluster0.pnua1pn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(()=>{
    console.log("connected to database");
}).catch((e)=>{
    console.log(e);
})

app.use("/products",productRoutes)
app.use("/user",userRoutes)
app.use("/cart",cartRoutes)
app.use("/order",orderRoutes)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
