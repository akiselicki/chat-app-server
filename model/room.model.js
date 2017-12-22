const mongoose = require('mongoose').set('debug', true);
const mongoosePaginate = require('mongoose-paginate')

const RoomSchema = new mongoose.Schema({
    name: String,
    pass: String
})

RoomSchema.plugin(mongoosePaginate);
const Room = mongoose.model('Room', RoomSchema)

module.exports = Room;