const stream = require('stream')
const writable = new stream.Writable()
const readable = new stream.Readable()
const store = []

writable._write = (chunk, encoding, callback) => {
    store.push(chunk)
    callback()
}

readable._read = (size, encoding) => {
    readable.push(store.pop() || null)
}

writable.write('fee')
writable.write('fi')
writable.write('fo')
writable.write('fum')

setTimeout(() => writable.write('2000'), 2000)
setTimeout(() => console.log(store.toString()), 5000)

readable.on('data', data => console.log(data.toString()))
