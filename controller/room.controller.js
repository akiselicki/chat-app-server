// Accessing the Service
const RoomService = require('../service/room.service')

// Saving the context of this module inside the _the variable
_this = this

// Async Controller function to get the room list
exports.getRooms = async function (req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    const page = req.query.page ? +req.query.page : 1
    const limit = req.query.limit ? +req.query.limit : 10;

    try {
        const rooms = await RoomService.getRooms({}, page, limit)
        // Return the room list with the appropriate HTTP Status Code and Message.
        return res.status(200).json({ status: 200, data: rooms, message: "Room list succesfully recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// Async Controller function to create or update room
exports.createRoom = async function (req, res, next) {

    // Req.Body contains the form submit values.
    const room = {
        name: req.body.name,
        pass: req.body.pass,
    }

    try {
        // Calling the Service function with the new object from the Request Body
        const createdRoom = await RoomService.createRoom(room)
        return res.status(201).json({ status: 201, data: createdRoom, message: "Room succesfully created" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: "Unable to create new room" })
    }
}

// Async Controller function to delete room
exports.removeRoom = async function (req, res, next) {

    const id = req.params.id;

    try {
        const deleted = await RoomService.deleteRoom(id)
        return res.status(204).json({ status: 204, message: "Room deleted" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}
