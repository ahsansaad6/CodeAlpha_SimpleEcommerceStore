// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Body parser middleware - allows parsing of JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware - enables parsing of cookies from incoming requests
app.use(cookieParser());

// Define a simple root route to confirm API is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Define API routes
app.use('/api/products', productRoutes); // Routes for product-related operations
app.use('/api/users', userRoutes);       // Routes for user authentication and management
app.use('/api/orders', orderRoutes);     // Routes for order creation and management

// NEW: PayPal Config Route
// This endpoint provides the PayPal Client ID to the frontend.
// The Client ID is loaded from your backend's .env file for security.
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Error handling middleware - these should be placed after all other routes
// notFound handles requests to undefined routes (404 errors)
app.use(notFound);
// errorHandler handles general errors thrown by other middleware or routes
app.use(errorHandler);

// Define the port the server will listen on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
