
const Cart = require("../Models/cartModel");
const Product = require("../Models/productModel")
exports.createCart = async (req, res) => {
  const { user_id } = req.user;
  const { product_id, quantity } = req.body;
  let cart = await Cart.findOne({ user_id });

  if (!cart) {
     cart = new Cart({
      user_id,
      products: [
        {
          product_id,
          quantity,
        },
      ],
    });
    await cart.save();
    return res.status(200).json({ message: "successful" });
  } 
  try {
    const Productindex = cart.products.find((prod) => {
      prod.product_id === product_id;
    });
    if (Productindex > -1) {
      cart.products[Productindex].quantity = quantity;
      await cart.save();
     res.status(200).json({ message: "msuccessful" });
    } else {
      cart.products.push({ product_id, quantity });
      await cart.save();
       res.status(200).json({ message: "ssuccessful" ,cart});
    }
  }
  catch(e){
    return res.status(400).json({message:e.message})
  }
};
exports.getCart = async (req, res) => {

    const {user_id} = req.user;    
    const cart = await Cart.findOne({user_id});
    if(!cart) {
            return res.status(400).json({error: "Cart is empty, Create a cart"});
        }
    try{
        let subTotal=0;
        const Cartitem = await Promise.all(
            cart.products.map(async (prod)=>{
                const productDetails=await Product.findOne({id: prod.product_id});
                subTotal+=productDetails.price*prod.quantity;
                return{
                    product_id: productDetails.id,
                    title:productDetails.title,
                    description:productDetails.description,
                    price: productDetails.price,
                    image:productDetails.image,
                    quantity:prod.quantity,
                }
            })
        )
        console.log("cartitem",Cartitem)
        res.status(200).json({Cartitem:Cartitem,subTotal})
    }
    catch(e){
        res.status(400).json({message: e.message})
    }
    } 

exports.deleteCart = async(req,res)=>{
    const{user_id} = req.user;
    const product_id=req.params.id;
    const cart = await Cart.findOne({user_id})
    if(!cart){
        return res.status(400).json({message:"cart is not found"})
    }
    try{
        const isValidProduct=cart.products.find((product)=>product_id===product.product_id)
        if(!isValidProduct){
            return res.status(400).json({message:"product is not found in cart"})
        }
        if(cart.products.length<=1){
            await Cart.deleteOne({user_id})
            return res.status(200).json({message:"cart is deleted"})
        }
        else{
            cart.products=cart.products.filter((product)=>product_id!=product.product_id)
            cart.save()
            return res.status(200).json({message:"cart deleted successful"})
        }

    }
    catch{
        return res.status(400).json({message:e.message})
    }
    

}
