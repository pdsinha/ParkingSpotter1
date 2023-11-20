const mongoose = require('mongoose')

const loggedLocationSchema = mongoose.Schema(
{
    notification: {
        type: String,
        required: [true, 'Please add a text value'],
    },
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('Logged Location',loggedLocationSchema) 