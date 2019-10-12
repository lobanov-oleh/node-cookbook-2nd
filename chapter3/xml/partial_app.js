const xml2js = require('xml2js')
const builder = new xml2js.Builder({rootName: 'profiles'})
const profiles = {
    normal: builder.buildObject(require('../json/profiles')),
    enhanced: builder.buildObject(require('./profiles_enhanced'))
}

const apply = (options, fn) => (xml, cb) => fn(xml, options, cb)

const parseString = apply({
    explicitArray: false,
    explicitRoot: false
}, xml2js.parseString)

parseString(profiles.normal, console.log)
parseString(profiles.enhanced, console.log)