// Accessing the Service
const MessageService = require('../service/message.service')

// Saving the context of this module inside the _the variable
_this = this

// Async Controller function to get the room's message list
exports.getMessages = async function (req, res, next) {
  
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    const page = req.query.page ? +req.query.page : 1
    const limit = req.query.limit ? +req.query.limit : 10;

    try {
        const messages = await MessageService.getMessages(req.params.id, page, limit)
        // Return the room list with the appropriate HTTP Status Code and Message.
        return res.status(200).json({ status: 200, data: messages, message: "Message list succesfully recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// Async Controller function to post message to the room
exports.postMessage = async function (req, res, next) {

    // Req.Body contains the form submit values.
    const message = {
        sender: req.body.sender,        
        text: req.body.text,
        date: req.body.date
    }

    try {
        // Calling the Service function with the new object from the Request Body
        const savedMessage = await MessageService.postMessage(message, req.params.id)
        return res.status(201).json({ status: 201, data: savedMessage, message: "Message succesfully posted" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: "Unable to post message" })
    }
}
