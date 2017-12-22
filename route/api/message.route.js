
var express = require('express')

var router = express.Router()

var MessageController = require('../../controller/message.controller');

// Map each API to the Controller Functions
router.get('/:id/messages', MessageController.getMessages)
router.post('/:id/messages', MessageController.postMessage)

// Export the Router
module.exports = router;