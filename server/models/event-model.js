const {Schema, model} = require('mongoose');

const EventSchema = new Schema({
    email: {type: String, required: true},
    startDate: {type: String, required: true},
    startTime: {type: String, required: true},
    endDate: {type: String, required: true},
    endTime: {type: String, required: true},
    header: {type: String, required: true},
    description: {type: String, required: false},
})

module.exports = model('Event', EventSchema);