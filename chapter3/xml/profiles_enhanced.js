module.exports = {
    ryan: {
        name: "Ryan Dahl",
        irc: "ryah",
        twitter: "ryah",
        github: ["ry", "joynet"],
        location: {$: {city: "San Francisco", country: "USA"}},
        description: "Creator of node.js"
    },
    isaac: {
        name: "Isaac Schlueter",
        irc: "isaacs",
        twitter: "izs",
        github: "isaacs",
        location: {$: {city: "San Francisco", country: "USA"}},
        description: "Former project gatekeeper, CTO npm, Inc."
    },
    tj: {
        name: "TJ Holowaychuk",
        irc: "tjholowaychuk",
        twitter: "tjholowaychuk",
        github: "visionmedia",
        location: {$: {city: "Victoria", country: "Canada"}, region: {_: "British Columbia", $: {type: "province"}}},
        description: "Author of express, jade and other popular modules"
    },
    felix: {
        name: "Felix Geisendorfer",
        irc: "felixge",
        twitter: "felixge",
        github: "felixge",
        location: {$: {city: "Berlin", country: "Germany"}},
        description: "Author of formidable, active core developer"
    }
}
