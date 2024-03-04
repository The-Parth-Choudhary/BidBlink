const router = require('express').Router();
const authmiddleware = require('../middlewares/authMiddleware');
const Notification = require('../models/notificationsModal');

// add a notification
router.post('/notify', authmiddleware, async (req, res) => {
    try {
        const newNotification = new Notification(req.body);
        await newNotification.save();
        res.send({
            success: true,
            message: 'Notification sent successfully'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

// get all notification by user id
router.get('/get-all-notifications', authmiddleware, async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.body.userId }).sort({ createdAt: -1 })
        res.send({
            success: true,
            data: notifications
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

// delete notification
router.delete('/delete-notification/:id', authmiddleware, async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            message: 'Notification deleted successfully'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

// read all notifications
router.put('/read-all-notifications', authmiddleware, async (req, res) => {
    try {
        await Notification.updateMany({ user: req.body.userId, read: false }, { $set: { read: true } })
        res.send({
            success: true,
            message: 'All notifications are marked as read'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

module.exports = router;