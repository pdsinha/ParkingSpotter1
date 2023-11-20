const express = require('express')
const router =  express.Router()
const { 
    viewNotificationMethods, 
    addNotificationMethod, 
    removeNotificationMethod,
} = require('../controllers/notificationController')
const {protect} = require('../middleware/authMiddleware')

router.get('/', viewNotificationMethods)
router.post('/', addNotificationMethod)
router.delete('/:id', removeNotificationMethod)

module.exports = router