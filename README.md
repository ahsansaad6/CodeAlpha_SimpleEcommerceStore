# Simple E-commerce Store

This is a foundational e-commerce web application built to demonstrate core functionalities of online retail. It covers the complete user journey from browsing products to placing an order.

## Features

* **Product Listings:** Displays a catalog of products on the homepage.
* **Product Details Page:** Dedicated pages for each product with detailed information.
* **Shopping Cart:** Users can add, update quantities, and remove items from their cart. Cart contents persist using local storage.
* **User Authentication:** Full user registration, login, logout, and profile management. Includes protected routes for secure access.
* **Order Processing:**
    * Shipping address collection.
    * Payment method selection (Cash On Delivery implemented).
    * Order summary and placement.
    * Detailed order view page.
* **Responsive UI:** Designed with React-Bootstrap for a consistent experience across devices.

## Technologies Used

* **Frontend:**
    * React.js
    * React Router DOM
    * React-Bootstrap
    * Redux Toolkit (for state management)
    * RTK Query (for API interactions)
* **Backend:**
    * Node.js
    * Express.js
    * Mongoose (ODM for MongoDB)
    * JSON Web Tokens (JWT) for authentication
    * Cookie-parser
    * Dotenv
* **Database:** MongoDB

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ahsansaad6/CodeAlpha_SimpleEcommerceStore.git](https://github.com/ahsansaad6/CodeAlpha_SimpleEcommerceStore.git)
    cd CodeAlpha_SimpleEcommerceStore
    ```

2.  **Backend Setup:**
    * Navigate to the `backend` directory:
        ```bash
        cd backend
        ```
    * Install backend dependencies:
        ```bash
        npm install
        ```
    * Create a `.env` file in the `backend` directory and add your MongoDB URI:
        ```
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key
        # PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id (Optional, if integrating PayPal later)
        ```
    * Run the backend server:
        ```bash
        npm start
        ```
        (The server will run on `http://localhost:5000` by default)

3.  **Frontend Setup:**
    * Open a new terminal and navigate to the `frontend` directory:
        ```bash
        cd ../frontend
        ```
    * Install frontend dependencies:
        ```bash
        npm install
        ```
    * Run the frontend development server:
        ```bash
        npm run dev
        ```
        (The frontend will run on `http://localhost:5173` by default)

The application should now be accessible in your browser at `http://localhost:5173`.

