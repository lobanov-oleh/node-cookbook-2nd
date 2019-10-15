const cradle = require('cradle')

const db = new (cradle.Connection)({
    auth: {
        username: 'oleglo',
        password: 'secret'
    }
}).database('quotes')

db.changes().on('response', response => {
    response.on('data', change => {
        const changeIsObj = {}.toString.call(change) === '[object Object]'

        if (!changeIsObj || change.deleted) {
            return
        }

        db.get(change.id, (err, doc) => {
            if (!doc) {
                return
            }

            if (doc.author && doc.quote) {
                console.log(`${doc.author}: ${doc.quote}`)
            }
        })

    })
})