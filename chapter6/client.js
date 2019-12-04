const ws = new (require('ws'))(`ws://localhost:8080`)

process.stdin.resume()
process.stdin.setEncoding('utf8')

process.stdin.on('data', msg => {
    ws.send(msg.trim(), console.log.bind(null, 'Sent:', msg.trim()))
})

ws.on('message', msg => console.log('Received:', msg))

ws.on('close', (code, desc) => console.log('Disconnected:', code, desc))

ws.on('error', e => console.log('Error: ', e.code))
