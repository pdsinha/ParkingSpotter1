const mongoose = require('mongoose')

const reportSchema = mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    location: {
        type: String,
        required: [true, 'Please add a text value'],
    },
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('Report',reportSchema) 