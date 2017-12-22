const Room = require('../model/room.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the room list
exports.getRooms = async function (query, page, limit) {
    // Options setup for the mongoose paginate
    const options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error 
    try {
        const rooms = await Room.paginate(query, options)
        // Return the room list that was retured by the mongoose promise
        return rooms;
    } catch (e) {
        console.log('error', e)
        // return a error message describing the reason 
        throw Error(`Error while paginating rooms`, e)
    }
}

// Async function to create new room
exports.createRoom = async function (room) {
    const name = room.name;

    try {
        const existingRoom = await Room.findOne({name: name})
        if (existingRoom) {
            return;
        }
    } catch (e) {
        throw Error(`Error occured while finding the room ${name}`)
    }

    // Creating a new Mongoose Object by using the new keyword
    const newRoom = new Room({
        name: room.name,
        pass: room.pass
    })

    try {
        // Saving the room 
        const savedRoom = await newRoom.save()
        return savedRoom;
    } catch (e) {
        // return a Error message describing the reason     
        throw Error(`Error while creating room`, e)
    }
}

// Async function to delete room
exports.deleteRoom = async function (id) {
    // Delete the room
    try {
        const deleted = await Room.remove({ _id: id })
        if (deleted.result.n === 0) {
            throw Error(`Room ${id} could not be deleted`)
        }
        return deleted
    } catch (e) {
        throw Error(`Error occured while deleting the room ${id}`, e)
    }
}