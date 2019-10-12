const http = require('http')
const fs = require('fs')
const path = require('path')
const profiles = require('./profiles')
const xml2js = require('xml2js')

//const index = fs.readFileSync('./index.html')
const index = fs.readFileSync('./add_profile_index.html')
const clientXml2js = fs.readFileSync('./xml2js.js')
const mimes = {
    js: "application/javascript",
    xml: "application/xml",
    json: "application/json"
}

const output = (content, format, rootNode) => {
    if (!format || format === 'json') {
        return JSON.stringify(content)
    }

    if (format === 'xml') {
        return (new xml2js.Builder({
            rootName: rootNode
        })).buildObject(content)
    }
}

const routes = {
    'profiles': format => output(Object.keys(profiles), format),
    '/profile': (format, basename) => output(profiles[basename], format, basename),
    'xml2js': ext => ext === 'js' ? clientXml2js : ''
}

const updateProfiles = (profile, type, cb) => {
    const name = Object.keys(profile).pop()
    profiles[name] = profile[name]
    cb(output(profiles[name], type, name))
}

const addProfile = (request, cb) => {
    let pD = '' // post data
    request
        .on('data', chunk => pD += chunk)
        .on('end', () => {
            const contentType = request.headers['content-type']

            if (contentType === 'application/json') {
                updateProfiles(JSON.parse(pD), 'json', cb)
            }

            if (contentType === 'application/xml') {
                xml2js.parseString(pD, {
                    explicitRoot: false,
                    explicitArray: false
                }, (err, obj) => updateProfiles(obj, 'xml', cb))
            }
        })
}

http.createServer((request, response) => {
    const dirname = path.dirname(request.url)
    let extname = path.extname(request.url)
    const basename = path.basename(request.url, extname)

    extname = extname.replace('.', '')

    if (request.method === 'POST') {
        addProfile(request, output => response.end(output))
        return
    }

    response.setHeader("Content-Type", mimes[extname] || 'text/html')

    if (routes.hasOwnProperty(dirname)) {
        response.end(routes[dirname](extname, basename))
        return
    }

    if (routes.hasOwnProperty(basename)) {
        response.end(routes[basename](extname))
        return
    }

    response.end(index)
}).listen(8080)
