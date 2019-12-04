const port = 8080
const wss = new (require('ws').Server)({ port })

wss.on('connection', (socket, req) => {
    socket.on('message', msg => {
        console.log('Received: ', msg, '\n',
        'From IP: ', req.connection.remoteAddress)

        if (msg === 'Hello') {
            socket.send('Websockets!')
        }
    })

    socket.on('close', (code, desc) => {
        console.log('Disconnect: ', code, desc)
    })

})