const request = require('request')
const JSONStream = require('JSONStream')
const WSServer = require('ws').Server
const stream = require('websocket-stream')

const wss = new WSServer({ port: 8080 })
const registry = 'http://skimdb.npmjs.com/registry'
const changes = '/_changes?heartbeat=20000&feed=continuous&since='

wss.on('connection', ws => {
    request({ url: registry, json: true }, (err, res, doc) => {
        if (err) {
            return console.log(err)
        }

        const since = doc.commited_update_seq - 50
        const idStream = JSONStream.parse('id')

        request(registry + changes + since)
            .pipe(idStream)
            .pipe(stream(ws))

        ws.on('close', () => idStream.destroy())
    })
})