const Generic = require('./generic')
const isSupported = require('./isSupported')

function Metas(addons, type, id) {
	if (! (this instanceof Metas))
		throw 'must call Metas as a constructor'

	const handle = this
	Generic.apply(this)

	// For every add-on. check if it supports meta and the requested type
	// If so, call it via .add() so we can keep track of all results (see generic.js)
	handle.run = function() {
		addons.forEach(function(addon) {
			if (isSupported(addon.manifest, 'meta', type, id)) {
				handle.add(addon, 'meta', type, id)
			}
		})
	}

	let viable
	handle.evs.on('updated', function() {
		if (viable) return

		handle.results.forEach(function(x) {
			if (x.response && x.response.meta /* && x.response.meta.id == id */) {
				viable = x.response
				handle.evs.emit('viable', viable)
			}
		})
	})
	
	return handle
}

module.exports = Metas