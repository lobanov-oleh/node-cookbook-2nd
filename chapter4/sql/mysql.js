const connection = require('./connection')

connection.query('CREATE DATABASE quotes', error => {
    if (error) {
        if (error.code === 'ER_DB_CREATE_EXISTS') {
            console.log('DB is already exist')
            return
        }
        throw error
    }

    console.log('DB is created')
})

const columns = 'id INT NOT NULL AUTO_INCREMENT, '
    + 'author VARCHAR(128) NOT NULL, '
    + 'quote TEXT NOT NULL, PRIMARY KEY (id)'

connection.query(`CREATE TABLE quotes.quotes (${columns})`, error => {
    if (error) {
        if (error.code === 'ER_TABLE_EXISTS_ERROR') {
            console.log('TABLE is already exist')
            return
        }
        throw error
    }

    console.log('TABLE is created')
})

const values = '"Bjarne Stroustrup", '
    + '"Proof by analogy is fraud."'
connection.query(`INSERT INTO quotes.quotes (author, quote) VALUES (${values})`, error => {
    if (error) {
        throw error
    }

    console.log('Author is inserted')
})

connection.end()
