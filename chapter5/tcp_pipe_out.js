#! /usr/bin/env node

const net = require('net')
const port = 1337

net.createServer(c => {
    process.stdin.pipe(c)
    c.pipe(process.stdout)
}).listen(port)
