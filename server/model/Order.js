const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        productImage: String,
        productDescription: String,
        productPrice: String,
        productName: String,
        quantity: {
            type: Number,
            default: 1
        }
    }
)

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [orderItemSchema],
    totalAmount: {
        type: Number,
        default: 0
    },

    paymentId: String,
    orderId: String,
    signature: String,

    paymentStatus:{
        type: String,
        enum:["Pending","Paid"],
        default:"Pending"
    },
     orderStatus:{
        type: String,
        enum:["Processing","Shipped","Delivered"],
        default:"Processing"
    }
})

module.exports = mongoose.model('Order', orderSchema)