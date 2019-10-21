const http = require('http')
const feed = 'http://isaacs.iriscouch.com/registry/_changes?feed=continuous'
let ready = false

const decide = cb => {
    console.log('deciding')
    setTimeout(() => {
        if (Date.now() % 2) {
            console.log('rejected')
            return
        }

        ready = true

        cb()
    }, 2000)
}

http.get(feed, res => {
    res.on('readable', function log() {
        if (!ready) {
            decide(log)
            return
        }

        console.log(res.read() + '')
    })
})