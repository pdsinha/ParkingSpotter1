
const asyncHandler = require('express-async-handler')

const Notifications = require('../models/Notification')

// @desc View selected notification methods
// @route GET /api/notificationMethods
// @access Private
const getNotificationMethods = asyncHandler(async(req, res) => {//CASE: VIEW NOTIFICATION METHODS (Priya)
    const methods = await Notification.find()

    res.status(200).json(report) // get notifications

})

// @desc Create crash report
// @route POST /api/notificationMethods
// @access Private
const addNotificationMethod = asyncHandler(async (req, res) => {

    
    if(!req.body.location){//CASE: NO NEW NOTIFICATION METHOD SELECTED (Priya)
        res.status(400)
        throw new Error('Please select notification method')
    }
    
    // Test case: checks if user exits,
    // should display User already exists'
    const report = await Report.create({//CASE: NEW NOTIFICATION METHOD SELECTED (Priya)
        location: req.body.location,

    })
    console.log(report);
    res.status(200).json(report)    
   
})

// @desc Delete notification Method
// @route DELETE /api/notificationMethod/:id
// @access Private
const deleteNotificationMethod = asyncHandler(async (req, res) => {
    const notification = await Notifications.findByID(req.params.id)
    console.log(notification);

    // Test case: checks if a notification was selected to remove,
    // should display Notification not selected'
    if (!notification){//CASE: NO NOTIFICATION SELECTED TO REMOVE
        res.status(400)
        throw new Error('Notification not selected')
    }

    await notification.remove()

    res.status(200).json({ id: req.params.id }) //CASE: DELETE THE NOTIFICATION METHOD BASED ON ID
})

module.exports = {
    getNotificationMethods,
    addNotificationMethod,
    deleteNotificationMethod,
}