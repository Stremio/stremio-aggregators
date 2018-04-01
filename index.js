
const addonStore = require('./testAddons')
// require('stremio-addon-client/lib/transports')
// to persist addons

const Generic = require('./lib/generic')
const Catalogs = require('./lib/catalogs')

// TEMP
const aggr = Catalogs(addonStore.addons)

aggr.on('finished', function() {
	aggr.results.forEach(function(r) {
		console.log(r.addon.manifest.id, r.type, r.id, r.response.metas.slice(0, 5).map(function(x) { return x.name }))
	})
})
// TEMP

module.exports = {
	Generic: Generic,
	Catalogs: Catalogs,
	// Streams: Streams,

	// NOTE: stream sorting should be implemented, but elegant and minimal
}