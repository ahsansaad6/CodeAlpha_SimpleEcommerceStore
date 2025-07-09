// backend/routes/productRoutes.js
import express from 'express'; // CHANGED: Use import instead of require
const router = express.Router();
import { getProducts, getProductById } from '../controllers/productController.js'; // CHANGED: Use import and .js extension

// Route for getting all products
router.route('/').get(getProducts);

// Route for getting a single product by ID
// The ':id' part is a placeholder for the product's ID in the URL
router.route('/:id').get(getProductById);

export default router; // CHANGED: Use export default instead of module.exports