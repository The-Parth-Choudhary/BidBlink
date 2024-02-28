const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        required: true
    },
    status: {
        type: String,
        default: 'active',
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model("users", userSchema);
module.exports = User;