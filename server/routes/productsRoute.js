const router = require('express').Router();
const Product = require('../models/productModel');
const authMiddleware = require('../middlewares/authMiddleware');

// add new product
router.post('/add-product', authMiddleware, async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        await newProduct.save();
        res.send({
            success: true,
            message: 'Product saved successfully'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});

// get all products
router.get('/get-products', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.send({
            success: true,
            products
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

// edit product
router.put('/edit-product/:id', authMiddleware, async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            success: true,
            message: 'Product updated successfully'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

// delete product
router.delete('/delete-product/:id', authMiddleware, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            message: 'Product deleted successfully'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

module.exports = router