#! /usr/bin/env node

const stream = require('stream')

class Uppercaser extends stream.Transform {
    constructor() {
        super()
    }

    _transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase())
    }
}

const uppercaser = new Uppercaser()

process.stdin.pipe(uppercaser).pipe(process.stdout)
