var Generic = require('./generic')

function Metas(addons, type, id) {
	if (! (this instanceof Metas))
		throw 'must call Metas as a constructor'

	var handle = this
	Generic.apply(this)

	// Prepare results, and then Generic.run() would actually fill it
	addons.forEach(function(addon) {
		if (addon.isSupported('meta', type, id)) {
			handle.pushResult({
				isReady: false,
				addon: addon,
				resource: 'meta',
				type: type,
				id: id
			})
		}
	})

	handle.getViable = function() {
		return handle.results.find(function(x) {
			return x.response && x.response.meta
		})
	}
	handle.getFinal = function() {
		if (!handle.results.every(function(x) { return x.isReady })) return null
		return handle.getViable()
	}
	
	return handle
}

module.exports = Metas
