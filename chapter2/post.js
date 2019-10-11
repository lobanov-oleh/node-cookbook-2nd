const urlOpts = {
    host: 'localhost',
    path: '/',
    port: '8080',
    method: 'POST'
}

const request = require('http').request(urlOpts, response => {
    response.on('data', chunk => console.log(chunk.toString()))
}).on('error', e => console.log(`Error: ${e.message}`))

process.argv.forEach((postItem, index) => {
    if (index > 1) {
        request.write(postItem + '\n')
    }
})

request.end()