const mongoose = require('mongoose')

const reportSchema = mongoose.Schema({
    location: {
        type: String,
        
    }
},{
    timestamps: true,
}
)

module.exports = mongoose.model('Report',reportSchema) 