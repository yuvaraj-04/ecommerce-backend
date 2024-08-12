const mongoose = require("mongoose");
const orderschema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    customername: {
        type: String,
        required: true,  
    },
    customeraddress: {
        type: String,
        required: true,  
    },
    phoneNumber: {
        type: Number,
        required: true, 
    },
    products: [{
        product_id: {
            type: String,
            required: true  
        },
        quantity: {
            type: Number,
            required: true,  
            min: 1 
        },
    }],
    orderDate: {
        type: Date,
        default: Date.now
    },
    delivaryDate: {
        type: Date,
        default: function() {
            let date = new Date(); 
            date.setDate(date.getDate() + 10); 
            return date; 
        }
    }
});

const Order = mongoose.model("order", orderschema);
module.exports=Order
