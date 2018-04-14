const Generic = require('./generic')

module.exports = function Catalogs(addons)
{
	const handle = this
	Generic.apply(this)
	
	// Prepare handle.results, and then Generic.run() would actually fill it
	addons.forEach(function(addon) {
		if (!Array.isArray(addon.manifest.catalogs)) return

		addon.manifest.catalogs.forEach(function(cat) {
			handle.results.push({
				isReady: false,
				addon: addon,
				resource: 'catalog',
				id: cat.id,
				type: cat.type,
			})
		})
	})
	
	return handle
}
