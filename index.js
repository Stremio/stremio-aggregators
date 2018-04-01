const detectFromURL = require('stremio-addon-client').detectFromURL

const addons = require('./testAddons')
// require('stremio-addon-client/lib/transports')
// to persist addons

const Generic = require('./lib/generic')

// TEMP
addons.forEach(function(url) {
	detectFromURL(url)
	.then(function(res) {
		if (res.addon) onAddon(res.addon)
	})
})

function onAddon(addon) {
	addon.manifest.catalogs.forEach(function(cat) {
		addon.get('catalog', cat.type, cat.id)
		.then(function(resp) {
			console.log(cat.type, cat.id, resp.metas.slice(0, 6).map(function(x) { return x.name }))
		})
	})
}
// TEMP

module.exports = {
	Generic: Generic,
	// Catalogs: Catalogs,
	// Streams: Streams,

	// NOTE: stream sorting should be implemented, but elegant and minimal
}