// backend/seeder.js

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const products = require('../data/products'); // Import your sample products
const Product = require('./models/Product'); // Import your Product model
const User = require('./models/User'); // Will use this later for users if needed
const Order = require('./models/Order'); // Will use this later for orders if needed

// Load environment variables - IMPORTANT: Specify the path to .env file
// Since .env is in the project root, and seeder.js is in 'backend',
// we need to go 'up one level' to find it.
dotenv.config({ path: '../.env' }); // <-- THIS IS THE CRUCIAL CHANGE

// Connect to the database (same logic as in server.js)
const connectDB = async () => {
    try {
        // Use the MONGO_URI from your .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Call connectDB to establish connection for seeder
connectDB();

const importData = async () => {
    try {
        // Clear existing data first to prevent duplicates
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany(); // Delete users if you had any

        // Insert sample products from the products.js file
        await Product.insertMany(products);

        console.log('Data Imported!');
        process.exit(); // Exit process after successful import
    } catch (error) {
        console.error(`Error with data import: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};

const destroyData = async () => {
    try {
        // Clear all data
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit(); // Exit process after successful destruction
    } catch (error) {
        console.error(`Error with data destroy: ${error.message}`);
        process.exit(1);
    }
};

// This allows you to run the script with arguments from the command line
// e.g., `node backend/seeder -d` to destroy data
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}