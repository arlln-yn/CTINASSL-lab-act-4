import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensure no duplicate product names
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    // new added route for series //1, 2, 3
    series: {
        type: String,
        enum: ['Series 1', 'Series 2', 'Series 3'],
        required: true,
    },

    description: {
        type: String,
        required: true,
    },


}, {
    timestamps: true // updates createdAt, updatedAt
});

const Product = mongoose.model('Product', productSchema);

export default Product;