// backend/models/Order.js
import mongoose from 'mongoose'; // CHANGED: Use import instead of require

const orderSchema = mongoose.Schema(
    {
        user: { // The user who placed the order
            type: mongoose.Schema.Types.ObjectId, // This is a reference to the User model
            required: true,
            ref: 'User', // Refers to the 'User' model
        },
        orderItems: [ // An array of products in the order
            {
                name: { type: String, required: true },
                qty: { type: Number, required: true },
                imageUrl: { type: String, required: true },
                price: { type: Number, required: true },
                product: { // Reference to the actual product
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product', // Refers to the 'Product' model
                },
            },
        ],
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        paymentResult: { // Details from payment gateway (e.g., PayPal, Stripe)
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String },
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        isPaid: { // Whether the order has been paid
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: { // Timestamp when the order was paid
            type: Date,
        },
        isDelivered: { // Whether the order has been delivered
            type: Boolean,
            required: true,
            default: false,
        },
        deliveredAt: { // Timestamp when the order was delivered
            type: Date,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order; // CHANGED: Use export default instead of module.exports