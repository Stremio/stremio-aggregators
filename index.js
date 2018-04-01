
const addonStore = require('./testAddons')
// require('stremio-addon-client/lib/transports')
// to persist addons

const Generic = require('./lib/generic')
const Catalogs = require('./lib/catalogs')
const Streams = require('./lib/streams')

// TEMP
const aggr = Catalogs(addonStore.addons)

aggr.on('finished', function() {
	aggr.results.forEach(function(r) {
		console.log(r.addon.manifest.id, r.type, r.id, r.response.metas.slice(0, 5).map(function(x) { return x.name }))
		
		// @NOTE: has to be documented; r.response is CERTAINLY here but not r.response.metas

		// TEMP
		if (r.addon.manifest.id === 'com.linvo.cinemeta' && r.type === 'series' && r.response.metas.length) 
			tryStreamsSeries(r.response.metas[0])
	})
})

function tryStreamsSeries(meta) {
	const aggr = Streams(addonStore.addons, meta.type, meta.imdb_id+':1:1')

	aggr.on('finished', function() {
		// @NOTE: has to be documented; r.response is CERTAINLY here but not r.response.streams

		aggr.results.forEach(function(r) {
			console.log(r.response.streams)
		})
	})
}
// TEMP

module.exports = {
	Generic: Generic,
	Catalogs: Catalogs,
	// Streams: Streams,

	// NOTE: stream sorting should be implemented, but elegant and minimal
}