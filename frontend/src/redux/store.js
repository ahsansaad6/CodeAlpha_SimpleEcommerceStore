// frontend/src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../slices/apiSlice'; // Import the base API slice
import cartReducer from '../slices/cartSlice'; // Import the cart slice reducer
import authReducer from '../slices/authSlice'; // Import the authentication slice reducer

// Configure the Redux store
const store = configureStore({
    reducer: {
        // The reducer for apiSlice. All injected endpoints (products, users, orders)
        // will automatically have their state managed under this path.
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartReducer, // Reducer for cart state
        auth: authReducer, // Reducer for authentication state
    },
    // Add middleware to the store.
    // getDefaultMiddleware() includes Redux Toolkit's default middleware.
    // apiSlice.middleware handles caching, invalidation, and async operations for RTK Query.
    // IMPORTANT: We only include apiSlice.middleware once, as all other specific API slices
    // (like productsApiSlice, userApiSlice, orderApiSlice) inject into this base apiSlice,
    // and their middleware is handled by this single instance.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true, // Enable Redux DevTools extension in development mode
});

export default store;
