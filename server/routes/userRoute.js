const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// new user registration
router.post('/register', async (req, res) => {
    try {
        //check if user already exist
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            throw new Error('User already exist');
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, sald);
        req.body.password = hashedPassword;

        //save user
        const newUser = new User(req.body);
        await newUser.save();

        //send response
        res.send({
            success: true,
            message: 'User created successfully'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//user login
router.post('./login', async (req, res) => {
    try {
        //check if user exist
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw new Error('User not found');
        }

        //check password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            throw new Error('Invalid password');
        }

        //create and assign token
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret);

        //send response
        res.send({
            success: true,
            message: 'User logged in successfully',
            data: token
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

module.exports = router;