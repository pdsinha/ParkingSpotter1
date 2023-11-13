
const asyncHandler = require('express-async-handler')
const Report = require('../models/ReportModel')
// @desc Get crash reports
// @route GET /api/crashReports
// @access Private
const getCrashReports = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'Get crash reports' })
})

// @desc Create crash report
// @route POST /api/goals
// @access Private
const createCrashReport = asyncHandler(async (req, res) => {

    console.log(req.body.location)
    if(!req.body.location){
        res.status(400)
        throw new Error('Please add location')
    }

    const report = await Report.create({
        location: req.body.location

    })
    res.status(200).json(report)    
   
})

// @desc Update crash report
// @route PUT /api/goals/:id
// @access Private
const updateCrashReport = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update crash report ${req.params.id}` })
})

// @desc Delete crash report
// @route DELETE /api/goals/:id
// @access Private
const deleteCrashReport = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete crash report ${req.params.id}` })
})

module.exports = {
    getCrashReports,
    createCrashReport,
    updateCrashReport,
    deleteCrashReport,
}