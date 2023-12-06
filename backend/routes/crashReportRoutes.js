const express = require('express')
const router = express.Router()
const { 
    getCrashReports,
    createCrashReport,
    updateCrashReport,
    deleteCrashReport
} = require('../controllers/crashReportController')

const {protect} = require ('../middleware/authMiddleware')

// router.route('/').get(getCrashReports).post(createCrashReport)
// router.route('/:id').delete(protect, deleteCrashReport)


//These functions' routes could be consolidated/connected, but for later readibility, I will not
router.post('/1', getCrashReports)

router.post('/', createCrashReport)

router.put('/:id', updateCrashReport)

router.delete('/:id', deleteCrashReport)

module.exports = router