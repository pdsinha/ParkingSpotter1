const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema(
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

module.exports = mongoose.model('Notification',notificationSchema) 