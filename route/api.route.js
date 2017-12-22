
var express = require('express')

var router = express.Router()

var rooms = require('./api/room.route')
var messages = require('./api/message.route')

router.use('/rooms', rooms);
router.use('/rooms', messages);

module.exports = router;