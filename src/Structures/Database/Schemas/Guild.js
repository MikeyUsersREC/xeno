const { Schema } = require('mongoose')
const Mongoose = require('mongoose')

module.exports = new Mongoose.model('EnabledExtensions', new Schema({
    _id: Mongoose.Types.ObjectId,
    GuildId: String,
    extensions: [
        { name: String, status: Boolean } 
    ]
}))