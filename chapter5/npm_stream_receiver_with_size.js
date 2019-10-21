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

const output = (res) => {
    const chunk = res.read(20)
    if (chunk === null) {
        return false
    }
    console.log(chunk + '')
    return true
}

http.get(feed, res => {

    res.on('readable', function log() {
        if (!ready) {
            return decide(log)
        }

        while(output(res)) {}
    })
})