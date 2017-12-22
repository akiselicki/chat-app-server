const mongoose = require('mongoose').set('debug', true);
const mongoosePaginate = require('mongoose-paginate')

const MessageSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    sender: String,
    text: String,
    date: Date
})

MessageSchema.plugin(mongoosePaginate);
const Message = mongoose.model('Message', MessageSchema)

module.exports = Message;