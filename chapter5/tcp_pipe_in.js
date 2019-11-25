#! /usr/bin/env node

const net = require('net')
const address = '127.0.0.1'
const port = 1337

net.connect(port, address, function() {
    process.stdin.pipe(this)
    this.pipe(process.stdout)
})
