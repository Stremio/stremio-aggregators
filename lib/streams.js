const Generic = require('./generic')
const isSupported = require('./isSupported')

function Streams(addons, type, id) {
	if (! (this instanceof Streams))
		throw 'must call Streams as a constructor'

	const handle = this
	Generic.apply(this)

	// For every add-on. check if it supports streams and the requested type
	// If so, call it via .add() so we can keep track of all results (see generic.js)
	this.run = function() {
		addons.forEach(function(addon) {
			if (isSupported(addon.manifest, 'stream', type, id)) {
				handle.add(addon, 'stream', type, id, getPreResponse(type, id))
			}
		})
	}
	
	return handle
}

// because all stremio clients support youtube natively,
// we don't actually call the add-on, just return a ready response
function getPreResponse(type, id) {
	if (type === 'channel' && id.indexOf('UC') === 0) {
		return { streams: [{ yt_id: id.split(':')[1] }] }
	}
}

module.exports = Streams