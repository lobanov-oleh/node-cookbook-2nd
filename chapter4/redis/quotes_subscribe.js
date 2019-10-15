const client = require('./client')
const argv = require('minimist')(process.argv)

const author = argv.a || null

client.subscribe(author, (err) => {
    if (err) {
        throw err
    }

    console.log(`Subscribing to ${author} channel`)

    client.on('message', (channel, msg) => {
        console.log(`${channel}: ${msg}`)
    })
})