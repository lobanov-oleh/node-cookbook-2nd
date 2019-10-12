let profiles = require('./profiles')

profiles = JSON.stringify(profiles).replace(/name/g, 'fullname')

profiles = JSON.parse(profiles)
profiles.felix.fullname = "Felix Geisendorfer"
console.log(profiles.felix)