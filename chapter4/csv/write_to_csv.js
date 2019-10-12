const fs = require('fs')
const stringify = require('csv-stringify')
const parse = require('csv-parse')

const data = [
    ['a', 'b', 'c,"', 'd', 'e', 'f', 'g'],
    ['h', 'i', 'j', 'k', 'l', 'm', 'n']
]

const options = {
    delimiter: '-',
    quote: '|'
}
const fileName = './data.csv'

stringify(data, options, function(err, output){
    fs.writeFileSync(fileName, output)
})

fs.readFile(fileName, (err, data) => {
    const csv = data.toString()
    const output = []
    parse(csv, options)
    .on('readable', function () {
        let record
        while (record = this.read()) {
            output.push(record)
        }
    })
    .on('end', () => console.log(output))
})