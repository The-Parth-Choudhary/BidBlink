const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

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
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
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
router.post('/login', async (req, res) => {
    try {
        //check if user exist
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw new Error('User not found');
        }

        // if user is active
        if (user.status !== 'active') {
            throw new Error('User is account is blocked, please contact the admin');
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

// get current user
router.get('/get-current-user', authMiddleware, async (req, res) => {
    try {

        const user = await User.findById(req.body.userId);
        res.send({
            success: true,
            message: "User fetched successfully",
            data: user
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
})

// get all users
router.get('/get-users', authMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.send({
            success: true,
            message: 'Users fetched successfully',
            data: users
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

// update user status
router.put('/update-user-status/:id', authMiddleware, async (req, res) => {
    try {
        const { status } = req.body;
        await User.findByIdAndUpdate(req.params.id, { status });
        res.send({
            success: true,
            message: 'User status updated successfully'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

// change password
router.put('/update-password/:id', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        if (!user) {
            throw new Error('User not found');
        }

        const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
        if (!validPassword) {
            throw new Error('Invalid old password');
        }

        if (req.body.newPassword !== req.body.reenterNewPassword) {
            throw new Error('Password does not match');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
        await User.findOneAndUpdate({ _id: req.params.id }, { password: hashedPassword });

        res.send({
            success: true,
            message: 'Password updated successfully'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

module.exports = router;