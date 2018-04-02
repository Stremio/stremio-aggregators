const Generic = require('./generic')

function Streams(addons, type, id) {
	const handle = Generic()

	// @TODO: youtube exceptions
	// @TODO: pre-passed results exception?

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