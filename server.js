const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Usuário conectado');

    socket.on('join', (username) => {
        socket.username = username;
        io.emit('chat message', { username: 'System', message: `${username} entrou no chat.` });
    });

    socket.on('chat message', (message) => {
        io.emit('chat message', { username: socket.username, message });
    });

    socket.on('disconnect', () => {
        io.emit('chat message', { username: 'System', message: `${socket.username} saiu do chat.` });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}`);
});
