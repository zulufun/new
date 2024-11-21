const mongoose = require('mongoose')
const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        sold: { type: Number, required: true, default: 0 },
        category: { type: String, required: true },
        brand: { type: String, required: true },
        // category: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref:'Category',
        //     required: true
        // },
        // brand: {
        //     type : mongoose.Schema.Types.ObjectId,
        //     ref : 'Brand',
        //     required: true
        // },
        image: { type: String },
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;