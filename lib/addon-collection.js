const AddonClient = require('stremio-addon-client').AddonClient
const constructFromManifest = require('stremio-addon-client').constructFromManifest

function AddonCollection(opts) {
	if (typeof(opts.save) !== 'function') throw 'need a save function'
	if (typeof(opts.load) !== 'function') throw 'need a load function'

	this.addons = []

	// SHOLD THIS be synchronous? probably
	
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
		if (!addon instanceof AddonClient) throw 'instance of AddonClient required'
		// @TODO: should we deduplicate here?
		this.addons.push(addon)
		save()
	}

	this.remove = function(addon) {
		if (!addon instanceof AddonClient) throw 'instance of AddonClient required'
		this.addons = this.addons.filter(function(x) { return x != addon })
		save()
	}

	function save() {
		opts.save(this.addons.map(function(x) { 
			return { transportName: x.transportName, manifest: x.manifest } 
		}), function(err) {
			// @TODO: err handling
		})
	}

	return this
}

module.exports = AddonCollection