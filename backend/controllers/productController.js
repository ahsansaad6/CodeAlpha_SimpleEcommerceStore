// backend/controllers/productController.js

import asyncHandler from '../middleware/asyncHandler.js'; // CHANGED: Use import and custom asyncHandler
import Product from '../models/Product.js'; // CHANGED: Use import and .js extension

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// CHANGED: Use named exports for ES Modules
export { getProducts, getProductById };