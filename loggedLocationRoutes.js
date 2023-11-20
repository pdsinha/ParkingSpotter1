const express = require('express')
const router = express.Router()
const { 
    viewParkingHistory,
    addLoggedLocation,
    deleteLoggedLocation,
} = require('../controllers/parkingHistoryController')

const {protect} = require ('../middleware/authMiddleware')

router.route('/').get(viewParkingHistory).post(addLoggedLocation)
router.route('/:id').delete(deleteLoggedLocation)


//These functions' routes could be consolidated/connected, but for later readibility, I will not
router.get('/', viewParkingHistory)

router.post('/', addLoggedLocation)

router.delete('/:id', deleteLoggedLocation)

module.exports = router