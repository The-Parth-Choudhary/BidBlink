const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    images: {
        type: Array,
        default: [],
        required: true
    },
    billAvailable: {
        type: Boolean,
        default: false,
        required: true
    },
    warrentyAvailable: {
        type: Boolean,
        default: false,
        required: true
    },
    accessoriesAvailable: {
        type: Boolean,
        default: false,
        required: true
    },
    boxAvailable: {
        type: Boolean,
        default: false,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    status: {
        type: String,
        default: "pending",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("products", productSchema);