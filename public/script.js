const socket = io();

function joinChat() {
    const username = document.getElementById('usernameInput').value;
    if (username.trim() !== '') {
        socket.emit('join', username);
        document.getElementById('chatForm').style.display = 'block';
        document.getElementById('usernameInput').readOnly = true;
    }
}

function sendMessage() {
    const message = document.getElementById('messageInput').value;
    if (message.trim() !== '') {
        socket.emit('chat message', message);
        document.getElementById('messageInput').value = '';
    }
}

socket.on('chat message', (data) => {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
    chatMessages.appendChild(messageElement);
});
