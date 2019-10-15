const cradle = require('cradle')
const db = new (cradle.Connection)({
    auth: {
        username: 'oleglo',
        password: 'secret'
    }
}).database('quotes')

const admin_lock = function (newDoc, savedDoc, userCtx) {
    if (userCtx.roles.indexOf('_admin') === -1) {
        throw({unauthorized: 'Only for admin users'})
    }

}

db.save('_design/_auth', {
    views: {},
    validate_doc_update: admin_lock.toString()
}, err => err && console.log(err))