const Generic = require('./generic')

module.exports = function Catalogs(addons)
{
	const handle = this
	Generic.apply(this)

	// @TODO: we need to make that auto-updatable - what happens if new addons arrive or addons are removed?
	
	// From all add-ons, request all catalogs
	// Keep track of all results via .add (see generic.js)
	addons.forEach(function(addon) {
		addon.manifest.catalogs.forEach(function(cat) {
			handle.add(addon, 'catalog', cat.type, cat.id)
		})
	})
	
	return handle
}