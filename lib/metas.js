const Generic = require('./generic')
const isSupported = require('./isSupported')

function Metas(addons, type, id) {
	if (! (this instanceof Metas))
		throw 'must call Metas as a constructor'

	const handle = this
	Generic.apply(this)

	// Prepare results, and then Generic.run() would actually fill it
	addons.forEach(function(addon) {
		if (isSupported(addon.manifest, 'meta', type, id)) {
			handle.pushResult({
				isReady: false,
				addon: addon,
				resource: 'meta',
				type: type,
				id: id
			})
		}
	})
	
	let viable = null
	handle.evs.on('updated', function() {
		if (viable) return

		handle.results.forEach(function(x) {
			if (x.response && x.response.meta /* && x.response.meta.id == id */) {
				viable = x.response
				handle.evs.emit('viable', viable)
			}
		})
	})

	handle.getViable = function() {
		return viable
	}
	
	return handle
}

module.exports = Metas