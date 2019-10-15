const redis = require('redis')
const client = redis.createClient()
const argv = require('minimist')(process.argv)

const params = {
    author: argv.a || null,
    quote: argv.q || null
}

if (params.author && params.quote) {
    const randKey = "Quotes: " + (Math.random() * Math.random()).toString(16).replace('.', '')

    const author = params.author
    const quote = params.quote
    client.multi()
    .hmset(randKey, {author, quote})
    .sadd('Author: ' + author, randKey)
    .exec((err, replies) => {
        if (err) {
            throw err
        }
        if (replies[0] == 'OK') {
            console.log('Added...')
        }
    })
}

if (params.author) {
    client.smembers('Author: ' + params.author, (err, keys) => {
        keys.forEach(key => {
            client.hgetall(key, (err, hash) => {
                console.log(`${hash.author}: ${hash.quote}`)
            })
        })
        client.quit()
    })
}
//client.quit()