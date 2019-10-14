const assert = require('assert')
const argv = require('minimist')(process.argv)

const url = 'mongodb://localhost:27017'
const dbName = 'quotes'
const collectionName = 'quotes'
const params = {
    author: argv.a || null,
    quote: argv.q || null
}

const insert = function (db, callback) {
    const collection = db.collection(collectionName);

    collection.insertOne({ author: params.author, quote: params.quote }, function (err, result) {
        assert.equal(err, null);
        console.log("Inserted author into the collection");
        callback(result);
    });
}

const find = function (db, callback) {
    const collection = db.collection(collectionName);

    collection.find({}).toArray(function (err, quotes) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(quotes)
        callback(quotes);
    });
}

const index = function (db, callback) {
    db.collection(collectionName).createIndex(
        { "author": 1 },
        null,
        function (err, results) {
            console.log(results);
            db.collection(collectionName).distinct('author', (err, result) => {
                console.log(result)
                callback();
            })
        }
    );
}

const update = function (db, callback) {
    const collection = db.collection(collectionName);
    collection.updateOne({ author: params.author }, { $inc: { votes: 1 } }, function (err, result) {
        console.log("Updated the author");
        callback(result);
    });
}

const mongoOptions = { useUnifiedTopology: true, useNewUrlParser: true }

require('mongodb').MongoClient.connect(url, mongoOptions, (err, client) => {
    if (err) {
        throw err
    }
    console.log('Connected successfully to server')

    const db = client.db(dbName)

    if (params.author && params.quote) {
        insert(db,
            () => update(db,
                () => index(db,
                    () => find(db, () => client.close())
                )
            )
        )
    } else {
        find(db, () => client.close())
    }
})
