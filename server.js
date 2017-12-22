// Get dependencies
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const bluebird = require('bluebird');
const mongoose = require('mongoose');
const app = require('express')();
const cors = require('cors');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/**
 * CORS Configuration
 */
app.use(cors());

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '5000';
console.log(`Port: ${port}`);
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

// Set Routes
app.get('/', function (req, res) {
    res.sendFile('Chat App');
});

// Get the API routes
var api = require('./route/api.route')
// Use the API routes for all routes matching /api
app.use('/api', api);

/**
 * Init socket.io
 */
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.on('join', function (data) {
        socket.username = data.username;
        socket.room = data.room;
        socket.join(socket.room);

        socket.broadcast.to(socket.room).emit('userConnected', `${socket.username} joined`);
    });

    socket.on('disconnect', function () {
        if (socket.username) {
            socket.leaveAll();
            socket.broadcast.to(socket.room).emit('userDisonnected', `${socket.username} left the chat`);
        }
    });

    socket.on('publicMessage', function (msg) {
        socket.broadcast.emit('newPublicMessage', msg);
    });

    socket.on('roomMessage', function (msg) {
        socket.broadcast.to(socket.room).emit('newRoomMessage', msg);
    });
});

/**
 * Init mongodb connection
 */
const dbUser = process.env.DB_USER && process.env.DB_PASS ? `${process.env.DB_USER}:${process.env.DB_PASS}@` : '';
const dbUri = process.env.DB_URI || '127.0.0.1:27017';
const dbName = process.env.DB_NAME || 'chatapp';
const mongoURL = `mongodb://${dbUser}${dbUri}/${dbName}`;

mongoose.Promise = bluebird;
mongoose.connect(mongoURL, { useMongoClient: true }).then(() => {
        console.log(`Succesfully Connected to the Mongodb Database at URL: ${mongoURL}`);
        initPublicRoom();
    }).catch(() => {
        console.log(`Error Connecting to the Mongodb Database at URL: ${mongoURL}`);
        process.exit();
    })


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

/**
 * Initialize public room, if doesn't exist it will be created
 */
function initPublicRoom() {
    const RoomService = require('./service/room.service');
    const room = {
        name: 'Public'
    };
    RoomService.createRoom(room).then((room) => {
        console.log('Public room initialized');
    }).catch(() => {
        console.log('Unable to init Public room');
    });
}
