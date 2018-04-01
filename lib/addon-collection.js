const AddonClient = require('stremio-addon-client').AddonClient
const constructFromManifest = require('stremio-addon-client').constructFromManifest

module.exports = function AddonCollection(opts) {
	if (typeof(opts.save) !== 'function') throw 'need a save function'
	if (typeof(opts.load) !== 'function') throw 'need a load function'

	this.addons = []
	
	opts.load(function(err, all) {
		// @TODO: how do we do err handling here?
		if (Array.isArray(all)) all.forEach(function(x) {
			this.addons.push(constructFromManifest(x.manifest, x.transportName, function(err) {
				// @TODO: err handling
				// this callback is only called when the manifest is UPDATED
				// hence we do not REALLY need it
			}))
		})
	})

	this.add = function(addon) {
		// @TODO: should we deduplicate here?
		this.addons.push(addon)

		opts.save(this.addons.map(function(x) { 
			console.log(x)
			return { transportName: x.transportName, manifest: x.manifest } 
		}), function(err) {
			// @TODO: err handling
		})
	}


	return this
}