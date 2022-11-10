const http = require('http').createServer();
const io = require('socket.io')(http);
const port = 3000

http.listen(port, () => {
    console.log(`*********** App started. ***********`)
    console.log(`
        
        ************************
        Now your chat application is running.
        To start chatting please follow thease steps.

        1. Open new terminal with same path.
        2. RUN CMD: 'node chat-client.js'
        3. Enter your name.
        4. Open another terminal with same path.
        5. Enter second user name.
        6. Send some message.
        7. Enjoy chatting.
        8. Thank you, :)

        ************************


    `);
})

io.on('connection', (socket) => {

    socket.on('new user', (usr) => {
        socket.username = usr;
        console.log('User connected - Username: ' + socket.username);
    });

    socket.on('message', (evt) => {
        // console.log(`evt : ${evt}`)
        socket.broadcast.emit('message', evt)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected - Username: ' + socket.username);
    });

})
