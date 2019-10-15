const cradle = require('cradle')
const argv = require('minimist')(process.argv)

const params = {
    author: argv.a || null,
    quote: argv.q || null
}

const dbName = 'quotes'

const errorHandler = err => {
    if (err) {
        console.log(err)
        process.exit()
    }
}

const createQuotesView = err => {
    errorHandler(err)

    db.save('_design/quotes', {
        views: {
            byAuthor: {
                map: 'function (doc) { emit(doc.author, doc) }'
            }
        }
    }, outputQuotes)
}

const outputQuotes = err => {
    errorHandler(err)

    if (params.author) {
        db.view('quotes/byAuthor', { key: params.author },
            (err, rowsArray) => {
                if (err && err.error === 'not_found') {
                    createQuotesView()
                    return
                }
                errorHandler(err)

                rowsArray.forEach(doc => console.log('%s: %s \n', doc.author, doc.quote))
                return
            }
        )
    }

}

const db = new (cradle.Connection)({
    //secure: true,
    auth: {
        username: 'oleglo',
        //username: 'david', // Only for admin users
        password: 'secret'
    }
}).database(dbName)

const checkAndSave = err => {
    errorHandler(err)

    if (params.author && params.quote) {
        db.save({ author: params.author, quote: params.quote }, outputQuotes)
        return
    }

    outputQuotes()
}

db.exists((err, exists) => {
    errorHandler(err)

    if (!exists) {
        db.create(checkAndSave)
        return
    }

    checkAndSave()
})