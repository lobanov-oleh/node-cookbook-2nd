const argv = require('minimist')(process.argv)
const connection = require('./connection')

const params = {
    author: argv.a || null,
    quote: argv.q || null
}

if (params.author) {
    const selectQuery = `SELECT * FROM quotes.quotes WHERE author LIKE ?`

    connection.query(selectQuery, [params.author], (error, results) => {
        if (error) {
            throw error
        }

        console.log(results)
    })
}

connection.end()
