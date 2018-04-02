const Generic = require('./generic')

function Streams(addons, type, id) {
	const handle = this
	Generic.apply(this)

	// @TODO: special cases, such as Streams being called with pre-ready candidates, or with YouTube
	// @TODO: pre-passed results case

	addons.forEach(function(addon) {
		var streamSupported = addon.manifest.resources.indexOf('stream') !== -1
		var typeSupported = addon.manifest.types.indexOf(type) !== -1

		if (streamSupported && typeSupported) {
			handle.add(addon, 'stream', type, id)
		}
	})
	
	return handle
}

module.exports = Streams