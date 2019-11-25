const Readable = require('stream').Readable

class StreamFromArray extends Readable {
    constructor(store) {
        super()
        this.store = store || []
    }

    _read(size, encoding) {
        this.push(this.store.pop() || null)
    }
}

module.exports = StreamFromArray
