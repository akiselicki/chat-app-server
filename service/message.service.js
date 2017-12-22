const Room = require('../model/room.model')
const Message = require('../model/message.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the message list
exports.getMessages = async function (roomId, page, limit) {
    // Options setup for the mongoose paginate
    const options = {
        page,
        limit
    }

    const room = await Room.findById(roomId)
    if (!room) {
        return;
    }
    const query = { room: room };

    // Try Catch the awaited promise to handle the error 
    try {
        const messages = await Message.paginate(query, options)
        // Return the message list that was retured by the mongoose promise
        return messages;
    } catch (e) {
        // return a error message describing the reason
        throw Error(`Error while paginating messages`, e)
    }
}

// Async function to post message
exports.postMessage = async function (message, roomId) {
    const room = await Room.findById(roomId)
    if (!room) {
        return;
    }
    message.room = room;

    // Creating a new Mongoose Object by using the new keyword
    const newMessage = new Message({
        room: room,
        sender: message.sender,
        text: message.text,
        date: message.date
    })

    try {
        // Saving the message 
        const savedMessage = await newMessage.save()
        return savedMessage;
    } catch (e) {
        // return a Error message describing the reason     
        throw Error(`Error while saving message`, e)
    }
}
