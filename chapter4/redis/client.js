const redis = require('redis')
const client = redis.createClient()
//client.config('SET', 'requirepass', 'foobared')
client.auth('foobared')

module.exports = client