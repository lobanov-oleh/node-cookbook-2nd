const StreamToArray = require('./stream_to_array')
const StreamFromArray = require('./stream_from_array')
const store = []
const writable = new StreamToArray(store)
const readable = new StreamFromArray(store)

writable.write('fee')
writable.write('fi')
writable.write('fo')
writable.write('fum')

readable.on('data', data => console.log(data+''))
