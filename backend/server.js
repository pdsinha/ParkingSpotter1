const express = require('express');
const dotenv = require('dotenv').config();

const colors = require('colors');
const connectDB = require('./config/db')
const port = process.env.PORT || 3000
const {errorHandler} = require('./middleware/errorMiddleware')
const cors = require('cors');



connectDB()
const app = express()



app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:false}))
// so each resource has its own route file under routes...
// therefore: find each get in individual files in the routes folder
/* TODO: Add all routes for the router: Get Reports, Create a report, Delete a report */
app.use('/api/crashReports', require('./routes/crashReportRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


app.use(errorHandler)
app.listen(port, () => console.log('Server listening on port ' + port))


 
