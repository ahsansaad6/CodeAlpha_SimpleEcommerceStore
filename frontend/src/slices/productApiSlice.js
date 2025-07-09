// frontend/src/slices/productsApiSlice.js
import { apiSlice } from './apiSlice'; // Import your base apiSlice
import { PRODUCTS_URL } from '../constants'; // Import PRODUCTS_URL from constants.js

// Inject endpoints into the base apiSlice
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Define a query for fetching all products
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL, // This will be '/api/products'
            }),
            // Keep the data in cache for 5 seconds after the last component unsubscribes
            // This helps prevent unnecessary re-fetches if the user navigates away and quickly back
            keepUnusedDataFor: 5,
        }),
        // You can add other product-related queries or mutations here later,
        // e.g., getProductDetails: builder.query(...)
        // e.g., createProduct: builder.mutation(...)
    }),
});

// Export the generated hooks for use in your components
export const { useGetProductsQuery } = productsApiSlice;