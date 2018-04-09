const Generic = require('./generic')
const isSupported = require('./isSupported')

function Streams(addons, type, id) {
	const handle = this
	Generic.apply(this)

	// @TODO: special cases, such as Streams being called with pre-ready candidates, or with YouTube
	// @TODO: pre-passed results case

	// For every add-on. check if it supports streams and the requested type
	// If so, call it via .add() so we can keep track of all results (see generic.js)
	addons.forEach(function(addon) {
		if (isSupported(addon.manifest, 'stream', type, id)) {
			handle.add(addon, 'stream', type, id)
		}
	})
	
	return handle
}

module.exports = Streams