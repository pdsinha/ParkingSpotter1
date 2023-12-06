const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/UserModel')
// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    
    
    if(!email || !password){
        res.status(400)
        throw new Error('Please add all fields')
       
    }

    // check if user exists 
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
       
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // create user
    const user = await User.create({
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            email: user.email,
    
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data')
        
    }
})

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    // check for user email 
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            email: user.email,
        })
    } else{
        res.status(400)
        throw new Error('Invalid credentials')
    }

    //res.json({ message: 'Login User' })
})

// @desc Get user data
// @route GET /api/users/me
// @access Public
const getMe = (req, res) => {
    res.json({ message: 'User data display' })
}

module.exports = {
    registerUser, 
    loginUser,
    getMe,
}