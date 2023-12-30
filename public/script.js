const socket = io();
let isJoined = false; 

function joinChat() {
    if (isJoined) {
        return; 
    }

    const username = document.getElementById('usernameInput').value;
    if (username.trim() !== '') {
        socket.emit('join', username);
        document.getElementById('chatForm').style.display = 'block';
        document.getElementById('usernameInput').readOnly = true;
        document.getElementById('joinButton').disabled = true; 
        isJoined = true; 
    }
}

function sendMessage() {
    const message = document.getElementById('messageInput').value;
    if (message.trim() !== '') {
        socket.emit('chat message', message);
        document.getElementById('messageInput').value = '';
    }
}

document.getElementById('messageInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

socket.on('chat message', (data) => {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
    chatMessages.appendChild(messageElement);
});
