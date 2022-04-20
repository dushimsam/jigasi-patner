const socketio = require("socket.io");
const {server} = require('./server.config')

const io = socketio(server);

io.on('connection', (socket:any) => {
    //TODO: Socket Room Concept
    // console.log('connected');
    socket.emit('welcome', {message: 'Connected to server'});

    socket.on('test', (data:any) => {
        // console.log(data)
    })
});

module.exports = {
    io
}
