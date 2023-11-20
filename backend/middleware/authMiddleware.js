const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // get token from header
            token = req.header.authorization.split(' ')[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user from the token
            req.user = await User.findByID(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

/*
// Testing authMiddleware (Kashir)
// Test functions
const testProtectWithToken = async () => {
    const mockReq = {
        headers: {
            authorization: 'Bearer validtoken123'
        }
    };
    const mockRes = {};
    const mockNext = jest.fn();

    // Mock jwt.verify and User.findById
    jwt.verify = jest.fn().mockReturnValue({ id: 'userId' });
    User.findById = jest.fn().mockResolvedValue({ id: 'userId', email: 'test@example.com' });

    try {
        await protect(mockReq, mockRes, mockNext);
        console.log('Test protect with token: Passed');
    } catch (error) {
        console.error('Test protect with token: Failed', error);
    }
};

const testProtectWithoutToken = async () => {
    const mockReq = {
        headers: {}
    };
    const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    };
    const mockNext = jest.fn();

    try {
        await protect(mockReq, mockRes, mockNext);
        console.error('Test protect without token: Failed - Should not reach this point');
    } catch (error) {
        console.log('Test protect without token: Passed');
    }
};

*/
module.exports = { protect }