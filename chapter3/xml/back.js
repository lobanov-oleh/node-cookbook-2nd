const profiles = require('./profiles_enhanced')
const xml2js = require('xml2js')
const builder = new xml2js.Builder({rootName:'profiles'})

let xmlProfiles = builder.buildObject(profiles)

console.log(xmlProfiles)