// backend/models/Product.js
import mongoose from 'mongoose'; // CHANGED: Use import instead of require

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true // Product names should ideally be unique
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0, // Default price if not specified
        },
        imageUrl: { // Optional: URL to product image
            type: String,
            required: false, // Not strictly required if no image
        },
        countInStock: { // Number of items available
            type: Number,
            required: true,
            default: 0,
        },
        category: { // E.g., "Electronics", "Clothing", "Books"
            type: String,
            required: true,
        },
        // You can add more fields later, like 'brand', 'rating', etc.
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product; // CHANGED: Use export default instead of module.exports