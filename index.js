const detectFromURL = require('stremio-addon-client').detectFromURL

const addons = require('./testAddons')

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