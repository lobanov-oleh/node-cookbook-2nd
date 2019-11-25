const http = require('http')
const JSONStream = require('JSONStream')
const feed = 'http://localhost:5984/quotes/_changes?feed=continuous';

const decide = cb => {
    console.log('deciding')
    setTimeout(() => {
        console.log('run')
        cb()
    }, 5000)
}

http.get(feed, res => {
    //decide(() => res.pipe(process.stdout))
    //decide(res.pipe.bind(res, process.stdout))
    //decide(() => res.pipe(JSONStream.parse('id')).pipe(process.stdout))

    res.pause()

    //decide(res.resume.bind(res))

    res.pipe(process.stdout)
})