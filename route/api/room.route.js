
var express = require('express')

var router = express.Router()

var RoomController = require('../../controller/room.controller');

// Map each API to the Controller Functions
router.get('/', RoomController.getRooms)
router.post('/', RoomController.createRoom)
router.delete('/:id', RoomController.removeRoom)

// Export the Router
module.exports = router;