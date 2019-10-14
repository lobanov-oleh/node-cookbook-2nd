const argv = require('minimist')(process.argv)
const connection = require('./connection')

const values = {
    author: argv.a || "No name",
    quote: argv.q || "No quote"
}
const insertQuery = `INSERT INTO quotes.quotes (author, quote) VALUES (?, ?)`
connection.query(insertQuery, [values.author, values.quote], error => {
    if (error) {
        throw error
    }

    console.log(`Author ${values.author} is inserted`)
})

connection.end()
