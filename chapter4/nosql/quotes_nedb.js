const nedb = require('nedb')
const argv = require('minimist')(process.argv)
const filename = './nedb.db'

const params = {
    author: argv.a || null,
    quote: argv.q || null
}

const db = new nedb({ filename })

db.loadDatabase(err => err && console.log(err))

const quote = { author: params.author, quote: params.quote }

db.insert(quote, function (err, quote) {   // Callback is optional
    if (err) {
        console.log(err)
        return
    }

    console.log(quote)

    db.update({ author: params.author }, { $set: { quote: 'updated quote' } }, { multi: true }, function (err, numReplaced) {
        if (err) {
            console.log(err)
            return
        }

        console.log('Updated ' + numReplaced + ' quotes')

        db.find({ author: params.author }, function (err, quotes) {
            if (err) {
                console.log(err)
                return
            }

            console.log(quotes)
        });
    });

});