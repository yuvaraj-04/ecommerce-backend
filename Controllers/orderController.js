const Order = require("../Models/orderModel");
const Cart = require("../Models/cartModel");
const Product = require("../Models/productModel");
exports.createOrder = async (req, res) => {
  const { user_id, email } = req.user;
  const { customername, customeraddress, phoneNumber } = req.body;
  let cart = await Cart.findOne({ user_id });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  const productArray = cart.products
  const order = new Order({
    user_id,
    customername,
    customeraddress,
    phoneNumber,
    email,
    products: productArray,
  });
  await order.save();
  await Cart.deleteOne({user_id})
  return res.status(200).json({ message: "successful" });
};
exports.getOrder=async(req,res)=>{
    const {user_id} = req.user;
    try {
        const order = await Order.find({user_id});
        return res.status(200).json( order );
    } catch(e) {
        res.status(400).json({ error: e.message});
    }}
