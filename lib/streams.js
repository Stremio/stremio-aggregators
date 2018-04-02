const Generic = require('./generic')

function Streams(addons, type, id) {
	const handle = Generic()

	// @TODO: youtube exceptions
	// @TODO: pre-passed results exception?

	addons.forEach(function(addon) {
		if (addon.manifest.resources.indexOf('stream') === -1)
			return
		if (addon.manifest.types.indexOf(type) === -1)
			return

		handle.add(addon, 'stream', type, id)
	})
	
	return handle
}

module.exports = Streams