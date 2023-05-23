const {Schema, model} = require('mongoose');

const TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, red: 'User'},
    refreshToken: {type: String, required: true},
})

module.exports = model('Token', TokenSchema);