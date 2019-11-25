#! /usr/bin/env node

const stream = require('stream')

class TextStream extends stream.Readable {
    constructor() {
        super()
    }

    _read(size, encoding) {
        const letter = String.fromCharCode(Math.random() * (123 - 97) + 97)
        this.push(letter === 'z' ? 'z\n' : letter)
    }
}

const textStream = new TextStream()
textStream.pipe(process.stdout)