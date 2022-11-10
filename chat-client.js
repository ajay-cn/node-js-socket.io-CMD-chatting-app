var socket = require('socket.io-client')('http://localhost:3000');

const repl = require('repl')

const prompt = require("prompt-sync")({ sigint: true });

var username = ''

socket.on('disconnect', function () {
    socket.emit('disconnect')
});

socket.on('connect', () => {
    console.log('=== start chatting ===')
    username = prompt("Enter your name: ");
    socket.emit('new user', username);
    console.log(`Welcome ${username}, Now start typing and hit 'ENTER BUTTON' to send your message.`);
    console.log('');
})
socket.on('message', (data) => {
    // const { cmd, username } = data
    // console.log({ data });
    console.log(data);
})

repl.start({
    prompt: 'My Message: ',
    eval: (msg) => {
        socket.send(username + ': ' + msg)
    }
})