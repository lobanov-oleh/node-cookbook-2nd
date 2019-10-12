const url = require('url')
const profiles = require('./profiles')

require('http').createServer((request, response) => {
    const urlObj = url.parse(request.url, true)
    const cb = urlObj.query.callback
    const who = urlObj.query.who
    let profile

    if (cb && who) {
        profile = cb + "(" + JSON.stringify(profiles[who]) + ")"
        response.end(profile)
    }
}).listen(8080)
