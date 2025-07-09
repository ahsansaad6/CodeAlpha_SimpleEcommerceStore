// backend/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // <-- NEW: Import bcryptjs

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-1]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please enter a valid email address'
            ]
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// <-- NEW: Middleware to hash password before saving -->
userSchema.pre('save', async function (next) {
    // Only hash if the password field is modified or is new
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10); // Generate a salt (random string)
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
});

// <-- NEW: Method to compare entered password with hashed password -->
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);

module.exports = User;