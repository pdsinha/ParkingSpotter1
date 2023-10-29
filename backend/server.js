const express = require("express");
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000

const app = express()

app.listen(port, () => console.log("Server listening on port " + port))

//TODO: Add routes for API routes
/*
app.get('/api/reports', (req, res) => {
   res.json([])
)}
 */