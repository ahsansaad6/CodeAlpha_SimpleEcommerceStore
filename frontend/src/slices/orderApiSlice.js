// frontend/src/slices/orderApiSlice.js
import { apiSlice } from './apiSlice'; // Import your base apiSlice
import { ORDERS_URL, PAYPAL_URL } from '../constants'; // Assuming you'll create constants.js

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Mutation for creating a new order
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL, // e.g., /api/orders
                method: 'POST',
                body: order,
            }),
        }),
        // Query for getting order details by ID
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`, // e.g., /api/orders/:id
            }),
            keepUnusedDataFor: 5, // Keep data in cache for 5 seconds
        }),
        // Mutation for marking an order as paid (PayPal integration)
        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URL}/${orderId}/pay`, // e.g., /api/orders/:id/pay
                method: 'PUT',
                body: details,
            }),
        }),
        // Query for getting PayPal client ID
        getPayPalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL, // e.g., /api/config/paypal
            }),
            keepUnusedDataFor: 5,
        }),
        // Mutation for marking an order as delivered (Admin only)
        deliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: 'PUT',
            }),
        }),
        // Query for getting all orders (Admin only)
        getOrders: builder.query({
            query: () => ({
                url: ORDERS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPayPalClientIdQuery,
    useDeliverOrderMutation,
    useGetOrdersQuery,
} = orderApiSlice;