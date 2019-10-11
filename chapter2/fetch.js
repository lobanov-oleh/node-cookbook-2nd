const http = require('http')
const url = require('url')
let urlOpts = {
    host: 'www.nodejs.org',
    path: '/',
    port: '80'
}

if (process.argv[2]) {
    let u = process.argv[2]
    if (!u.match('http://')) {
        u = `http://${u}`
    }
    urlOpts = url.parse(u)
}

console.log(urlOpts)

http.get(urlOpts, response => response
    .on('data', chunk => console.log(chunk.toString()))
).on('error', e => console.log(`Error: ${e.message}`))
