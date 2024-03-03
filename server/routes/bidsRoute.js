const router = require('express').Router();
const Bid = require('../models/bidModel');
const authMiddleware = require('../middlewares/authMiddleware');
const { model } = require('mongoose');

//place a new bid
router.post('/place-new-bid', authMiddleware, async (req, res) => {
    try {
        const newBid = new Bid(req.body);
        await newBid.save();
        res.send({
            success: true,
            message: 'Bid placed successfully'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});

// get all bids
router.get('/get-all-bids', authMiddleware, async (req, res) => {
    try {
        const { product, seller } = req.body;
        let filters = {};
        if (product) {
            filters.product = product;
        }
        if (seller) {
            filters.seller = seller;
        }
        const bids = await Bid.find(filters).populate('product').populate('buyer').populate('seller');
        res.send({
            success: true,
            data: bids
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

module.exports = router;