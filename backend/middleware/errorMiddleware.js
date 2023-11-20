const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack

    })
}

/*
// Testing errorMiddleware.js (Kashir Khan)
// Test functions
const testErrorHandlerWithCustomError = () => {
    const mockReq = {};
    const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    const mockNext = jest.fn();
    const error = new Error('Error message');

    errorHandler(error, mockReq, mockRes, mockNext);

    console.log('Test errorHandler with custom error:', {
        statusCalledWith: mockRes.status.mock.calls,
        jsonCalledWith: mockRes.json.mock.calls
    });
};

const testErrorHandlerWithStatusCode = () => {
    const mockReq = {};
    const mockRes = {
        statusCode: 404,
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    const mockNext = jest.fn();
    const error = new Error('Not found');

    errorHandler(error, mockReq, mockRes, mockNext);

    console.log('Test errorHandler with status code:', {
        statusCalledWith: mockRes.status.mock.calls,
        jsonCalledWith: mockRes.json.mock.calls
    });
};
*/
module.exports = {
    errorHandler
}