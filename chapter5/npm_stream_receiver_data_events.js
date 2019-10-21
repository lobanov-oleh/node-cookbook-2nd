const http = require('http')
const feed = 'http://isaacs.iriscouch.com/registry/_changes?feed=continuous'
let ready = false

const decide = cb => {
    console.log('deciding')

    setTimeout(() => {
        //if (Date.now() % 2) {
        //    console.log('rejected')
        //    return
        //}

        ready = true

        cb()
    }, 2000)
}

http.get(feed, res => {
    //res.pause()

    //if (!ready) {
    //    decide(res.resume.bind(res))
    //}

    //res.on('data', data => console.log(data+''))

    decide(() => res.on('data', data => console.log(data)))
})