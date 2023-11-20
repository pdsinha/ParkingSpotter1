
const asyncHandler = require('express-async-handler')

const History = require('../models/LoggedLocation')

// @desc View parking logged history
// @route GET /api/HistoryLog
// @access Private
const viewParkingHistory = asyncHandler(async(req, res) => {//CASE: VIEW PARKING HISTORY
    const history = await History.find()

    res.status(200).json(report) // get all recent logged history

})

// @desc Add Logged Location
// @route POST /api/HistoryLog
// @access Private
const addLoggedLocation = asyncHandler(async (req, res) => {


    if(!req.body.location){//CASE: NO NEW INFORMATION ADDED
        res.status(400)
        throw new Error('Please select notification method')
    }

    const locationlog = await History.create({//CASE: NEW INFORMATION ADDED
        location: req.body.location,

    })
    console.log(location);
    res.status(200).json(location)    
   
})

// @desc Delete Logged Location
// @route DELETE /api/HistoryLog/:id
// @access Private
const deleteLoggedLocation = asyncHandler(async (req, res) => {
    const location = await History.findByID(req.params.id)
    console.log(location);

    if (!location){//CASE: NO LOGGED LOCATION SELECTED TO REMOVE
        res.status(400)
        throw new Error('Logged Location not selected')
    }

    await location.remove()

    res.status(200).json({ id: req.params.id }) //CASE: DELETE THE LOGGED LOCATION BASED ON ID
})

module.exports = {
    viewParkingHistory,
    addLoggedLocation,
    deleteLoggedLocation,
}