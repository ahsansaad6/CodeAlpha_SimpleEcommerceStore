// frontend/src/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Get user info from local storage if it exists, otherwise null
const initialState = {
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action for successful login/registration
        setCredentials: (state, action) => {
            state.userInfo = action.payload; // Payload will be user data {_id, name, email, isAdmin}
            localStorage.setItem('userInfo', JSON.stringify(action.payload)); // Save to local storage
        },
        // Action for user logout
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
            // Optionally, clear cart items on logout if desired
            // localStorage.removeItem('cartItems');
            // state.cartItems = [];
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;