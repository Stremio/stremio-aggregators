const detectFromURL = require('stremio-addon-client').detectFromURL

const addonURLs = require('./testAddons')
// require('stremio-addon-client/lib/transports')
// to persist addons

const Generic = require('./lib/generic')
const Catalogs = require('./lib/catalogs')

// TEMP
Promise.all(addonURLs.map(function(x) { return detectFromURL(x) }))
.then(function(results) {
	const addons = results
		.map(function(x) { return x.addon })
		.filter(function(x) { return x })

	const aggr = Catalogs(addons)

	aggr.on('finished', function() {
		console.log(aggr.results)
	})
})
// TEMP

module.exports = {
	Generic: Generic,
	Catalogs: Catalogs,
	// Streams: Streams,

	// NOTE: stream sorting should be implemented, but elegant and minimal
}