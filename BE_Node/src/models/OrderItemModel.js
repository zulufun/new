const mongoose = require('mongoose')
const orderItemSchema = new mongoose.Schema(
    {
        // order: {
        //     type : mongoose.Schema.Types.ObjectId,
        //     ref : 'Order',
        //     required: true 
        // },
        // product: {
        //     type : mongoose.Schema.Types.ObjectId,
        //     ref : 'Product',
        //     required: true
        // },
        order: { type: String, required: true },
        product: { type: String, required: true },
        name: { type: String, required: true },
        image: { type: String },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        totalPrice : { type: Number }
    },
    {
        timestamps: true
    }
);

const OrderItem = mongoose.model("OrderItem", orderItemSchema);
module.exports = OrderItem;