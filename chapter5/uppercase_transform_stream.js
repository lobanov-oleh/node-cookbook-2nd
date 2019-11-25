const stream = require('stream')
const transformable = new stream.Transform()

transformable._transform = (chunk, endoding, callback) => {
    //transformable.push(chunk.toString().toUpperCase())
    //callback()
    callback(null, chunk.toString().toUpperCase())
}

transformable.write('fee')
transformable.write('fi')
transformable.write('fo')
transformable.write('fum')

process.stdin.pipe(transformable).pipe(process.stdout)
