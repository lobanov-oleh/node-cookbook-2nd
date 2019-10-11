const fs = require('fs')
const form = fs.readFileSync('put_upload_form.html')

require('http').createServer((request, response) => {
    if (request.method === "GET") {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end(form)
    }

    if (request.method === "PUT") {
        const fileData = Buffer.alloc(+request.headers['content-length'])
        let bufferOffset = 0
        request.on('data', chunk => {
            chunk.copy(fileData, bufferOffset)
            bufferOffset += chunk.length
        }).on('end', () => {
            const rand = (Math.random() * Math.random()).toString(16).replace('.', '')
            const to = `uploads/${rand}-${request.headers['x-uploadedfilename']}`

            fs.writeFile(to, fileData, err => {
                if (err) {
                    throw err
                }

                console.log('Saved file to ' + to)
                response.end()
            })
        })
    }
}).listen(8080)