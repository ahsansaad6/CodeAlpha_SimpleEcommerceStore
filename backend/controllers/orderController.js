// backend/controllers/orderController.js
import Order from '../models/Order.js'; // CHANGED: Use import and .js extension
import Product from '../models/Product.js'; // CHANGED: Use import and .js extension
import asyncHandler from '../middleware/asyncHandler.js'; // ADDED: Import asyncHandler

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Requires authentication)
const addOrderItems = asyncHandler(async (req, res) => { // CHANGED: Wrapped with asyncHandler
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items'); // CHANGED: Use throw new Error for asyncHandler
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems: orderItems.map(x => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private (Requires authentication)
const getOrderById = asyncHandler(async (req, res) => { // CHANGED: Wrapped with asyncHandler
    const order = await Order.findById(req.params.id)
        .populate('user', 'name email')
        .populate('orderItems.product', 'name imageUrl');

    if (order) {
        // Ensure only the user who placed the order (or an admin) can view it
        if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            res.status(403);
            throw new Error('Not authorized to view this order'); // CHANGED: Use throw new Error
        }
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found'); // CHANGED: Use throw new Error
    }
});

// @desc    Update order to paid (Admin only or payment gateway callback)
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => { // CHANGED: Wrapped with asyncHandler
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        // order.paymentResult = { ... }; // Keep commented for now

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found'); // CHANGED: Use throw new Error
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => { // CHANGED: Wrapped with asyncHandler
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => { // CHANGED: Wrapped with asyncHandler
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});

// CHANGED: Use named exports for ES Modules
export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders
};