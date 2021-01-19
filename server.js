const express = require('express');
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

const chatStorage = {
    users: {},
    messages: []
}

const getUser = (id) => {
    for (let key in chatStorage.users) {
        if (chatStorage.users[key].socketId === id) {
            return chatStorage.users[key]
        }
    }
}

const disconnectUser = (id) => {
    for (let key in chatStorage.users) {
        if (chatStorage.users[key].socketId === id) {
            chatStorage.users[key].isOnline = false;
            return chatStorage.users[key]
        }
    }
}

app.get('/users', (req, res) => {
    res.json(chatStorage.users)
})

app.get('/messages', (req, res) => {
    res.json(chatStorage.messages)
})

io.on('connection', socket => {
    socket.on('CHAT:JOIN', data => {
        chatStorage.users[data].isOnline = true;
        chatStorage.users[data].socketId = socket.id;

        socket.broadcast.emit('CHAT:JOINED', getUser(socket.id))
    })

    socket.on('CHAT:REGISTER', data => {
        chatStorage.users[data.name] = {name: data.name, url: data.url, isOnline: true};
    })

    socket.on('CHAT:SEND', data => {
        chatStorage.messages.push(data);

        socket.broadcast.emit('CHAT:SENT', data)
    })

    socket.on('CHAT:DELETE', data => {
        delete chatStorage.users[data];
        chatStorage.messages = [ ...chatStorage.messages.filter(el => el.user !== data) ];

        socket.broadcast.emit('CHAT:DELETED', data);
    })

    socket.on('disconnect', () => {
        const user = disconnectUser(socket.id);

        if (user) {
            socket.broadcast.emit('CHAT:DISCONNECT', user)
        }
    })
})

server.listen(8888, (err) => {
    if (err) {
        throw Error(err);
    }

    console.log('Сервер запущен')
})