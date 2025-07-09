// frontend/src/slices/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base URL for your backend API.
// An empty string means it will use the current host (e.g., localhost:5173)
// and rely on the proxy setup in vite.config.js to redirect /api requests to your backend.
const baseQuery = fetchBaseQuery({ baseUrl: '' });

// Create the base API slice using createApi
export const apiSlice = createApi({
    baseQuery, // Use the defined base query
    // Define tag types for caching and invalidation.
    // These tags allow you to invalidate cached data when mutations occur (e.g., a new product is added).
    tagTypes: ['Product', 'Order', 'User'],
    // Endpoints are defined here or injected later from other slices.
    // This base slice can remain empty or contain common endpoints.
    endpoints: (builder) => ({
        // Specific endpoints (like getProducts, login, createOrder) will be injected into this apiSlice
        // from their respective slices (e.g., productsApiSlice, userApiSlice, orderApiSlice).
    }),
});
