
const asyncHandler = require('express-async-handler')

const Report = require('../models/ReportModel')
const User = require('../models/UserModel')
// @desc Get crash reports
// @route GET /api/crashReports
// @access Private
const getCrashReports = asyncHandler(async(req, res) => {
    const report = await Report.find({ user: req.user.id })

    res.status(200).json(report) // get report

})

/* maybe use to show all reports
const getCrashReports = asyncHandler(async(req, res) => {
    const report = await Report.find()

    res.status(200).json(report) // get report

})
*/

// @desc Create crash report
// @route POST /api/
// @access Private
const createCrashReport = asyncHandler(async (req, res) => {

    console.log(req.body.location)
    if(!req.body.location){
        res.status(400)
        throw new Error('Please add location')
    }

    const report = await Report.create({
        location: req.body.location,
        user: req.user.id,  // this will require users to be logged in in order to make a report

    })
    console.log(report);
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
    const report = await Report.findByID(req.params.id)
    console.log(report);

    if (!report){
        res.status(400)
        throw new Error('Report not found')
    }

    const user = await User.findByID(req.user.id)

    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the report user
    if(report.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await report.remove()

    res.status(200).json({ id: req.params.id }) // delete the report based on ID
})

module.exports = {
    getCrashReports,
    createCrashReport,
    updateCrashReport,
    deleteCrashReport,
}