const Writable = require('stream').Writable

class StreamToArray extends Writable {
    constructor(store) {
        super()
        this.store = store || []
    }

    _write(chunk, encoding, callback) {
        this.store.push(chunk)
        callback()
    }
}

module.exports = StreamToArray
