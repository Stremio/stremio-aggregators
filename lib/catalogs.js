const Generic = require('./generic')

module.exports = function Catalogs(addons)
{
	const handle = Generic()

	// From all add-ons, request all catalogs
	addons.forEach(function(addon) {
		addon.manifest.catalogs.forEach(function(cat) {
			handle.add(addon, 'catalog', cat.type, cat.id)
		})
	})
	
	return handle
}
