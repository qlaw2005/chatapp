const express = require('express');
const app = express();
let randomColor = require('randomcolor');
const uuid = require('uuid');


//middlewares 
app.use(express.static('public'));

// routes 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

server = app.listen(process.env.PORT || 5000);

//socket

const io = require('socket.io')(server);

const user = [];
const connection = [];

//listen on every connection 
io.on('connection', (socket) => {
    console.log("New User Connected");
    connection.push(socket)
    let color = randomColor();
    socket.username = 'Anonymous';
    socket.color = color;
});

socket.on('change_username', data => {
    let id = uuid.v4(); // create random id for the user
    socket.id = id;
    socket.username = data.nickName;
    user.push({
        id,
        username: socket.username,
        color: socket.color
    });
    updateUsernames();
});

// update usernames in the client
const updateUsernames = () => {
    io.sockets.emit('get users', users)
}

//listen on new_message 

socket.on('new_message', (data) => {
    io.sockets.emit('new_message', {
        message: data.message,
        username: socket.username,
        color: socket.color
    });
});

//Disconnect 
socket.on('disconnect', data => {
    if (!socket.username)
        return;
    let user = underfined;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === socket.id) {
            user = users[i];
            break;
        }
    }
    users.splice(user, 1);
    updateUsernames();
    connections.splice(connections.indexOf(socket), 1);
});