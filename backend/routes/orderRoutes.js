// backend/routes/orderRoutes.js
import express from 'express';
const router = express.Router();
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders
} from '../controllers/orderController.js'; // CHANGED: Added .js extension and used import
import { protect, admin } from '../middleware/authMiddleware.js'; // CHANGED: Added .js extension and used import

// POST /api/orders - Create new order (Protected)
// GET /api/orders - Get all orders (Admin only)
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

// GET /api/orders/myorders - Get logged in user orders (Protected)
router.route('/myorders').get(protect, getMyOrders);

// GET /api/orders/:id - Get order by ID (Protected)
// PUT /api/orders/:id/pay - Update order to paid (Protected)
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router; // CHANGED: Use export default instead of module.exports