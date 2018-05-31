const Generic = require('./generic')

const isCatalogSupported = require('./isCatalogSupported')

module.exports = function Catalogs(addons, extra)
{
	const handle = this
	Generic.apply(this)
	
	// Prepare handle.results, and then Generic.run() would actually fill it
	addons.forEach(function(addon) {
		if (!Array.isArray(addon.manifest.catalogs)) return

		addon.manifest.catalogs.forEach(function(cat) {
			if (isCatalogSupported(cat, extra)) handle.pushResult({
				isReady: false,
				addon: addon,
				resource: 'catalog',
				catalog: cat,
				id: cat.id,
				type: cat.type,
				extra: extra,
			})
		})
	})
	
	return handle
}