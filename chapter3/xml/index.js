const profiles = require('../json/profiles')
const xml2js = require('xml2js')
const builder = new xml2js.Builder({rootName: 'profiles'})

let xmlProfiles = builder.buildObject(profiles)
xmlProfiles = xmlProfiles.replace(/name/g, 'fullname')
console.log(xmlProfiles)

xml2js.parseString(xmlProfiles, {
    explicitArray: false,
    explicitRoot: false
}, (err, obj) => {
    xmlProfiles = obj
    xmlProfiles.profiles.felix.fullname = "Felix Geisendorfer (edited)"
    console.log(xmlProfiles)
})
