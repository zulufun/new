const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema(
    {
        shippingAddress: { type: String, required: true },
        recipient: { type: String, required: true },
        phone: { type: String, required: true },
        orderDate: { type: Date, required: true },
        paymentMethod: { type: String, required: true },
        status: { type: Number, required: true },
        totalPrice: { type : Number },
        user: { type: String, required: true }
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true
        // }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;