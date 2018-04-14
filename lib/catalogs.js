const Generic = require('./generic')

module.exports = function Catalogs(addons)
{
	const handle = this
	Generic.apply(this)
	
	// From all add-ons, request all catalogs
	// Keep track of all results via .add (see generic.js)
	this.run = function() {
		addons.forEach(function(addon) {
			if (!Array.isArray(addon.manifest.catalogs)) addon.manifest.catalogs.forEach(function(cat) {
				handle.add(addon, 'catalog', cat.type, cat.id)
			})
		})
	}
	
	return handle
}
