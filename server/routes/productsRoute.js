const router = require('express').Router();
const Product = require('../models/productModel');
const User = require('../models/userModel');
const authMiddleware = require('../middlewares/authMiddleware');
const cloudinary = require('../config/cloudinaryConfig');
const multer = require('multer');
const Notification = require('../models/notificationsModal');

// add new product
router.post('/add-product', authMiddleware, async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        await newProduct.save();

        // send notification to admin
        const admins = await User.find({ role: 'admin' });
        const user = await User.findById(req.body.userId);
        admins.forEach(async (admin) => {
            const newNotification = new Notification({
                user: admin._id,
                message: `New product added by ${user.name}`,
                title: 'New Product',
                onclick: `/admin`
            })
            await newNotification.save();
        })
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

// get product by id
router.get('/get-product-by-id/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('seller');
        res.send({
            success: true,
            data: product
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

// get products
router.post('/get-products', async (req, res) => {
    try {
        const { seller, category = [], age = [], search = '', status } = req.body;
        let filters = {};
        if (seller) {
            filters.seller = seller;
        }
        if (status) {
            filters.status = status;
        }
        // filter by category
        if (category.length > 0) {
            filters.category = { $in: category };
        }
        // filter by age
        if (age.length > 0) {
            const ageFilters = age.map((item) => {
                const fromAge = item.split('-')[0];
                const toAge = item.split('-')[1];
                return { age: { $gte: fromAge, $lte: toAge } };
            });
            filters.$or = ageFilters;
        }

        if (search.length !== 0) {
            filters.name = { $regex: search, $options: 'i' };
        }else{
            delete filters.name;
        }
        const products = await Product.find(filters).populate('seller').sort({ createdAt: -1 });
        res.send({
            success: true,
            data: products
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

// get image from pc
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
})

router.post('/upload-image-to-product', authMiddleware, multer({ storage: storage }).single('file'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'BidBlink' });

        const productId = req.body.productId;
        await Product.findByIdAndUpdate(productId, { $push: { images: result.secure_url } })
        res.send({
            success: true,
            message: 'Image uploaded successfully',
            data: result.secure_url
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

// update product status
router.put('/update-product-status/:id', authMiddleware, async (req, res) => {
    try {
        const { status } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { status });

        // send notification to seller
        const newNotification = new Notification({
            user: updatedProduct.seller,
            message: `Your product ${updatedProduct.name} has been ${status}`,
            title: 'Product status update',
            onclick: '/profile'
        })
        newNotification.save();

        res.send({
            success: true,
            message: 'Product status updated successfully'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

module.exports = router