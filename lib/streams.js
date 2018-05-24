const Generic = require('./generic')
const isSupported = require('./isSupported')

function Streams(addons, type, id) {
	if (! (this instanceof Streams))
		throw 'must call Streams as a constructor'

	const handle = this
	Generic.apply(this)

	// Inferred response
	const resp = getPreResponse(type, id)
	if (resp) {
		handle.pushResult({
			isReady: true,
			resource: 'stream',
			type: type,
			id: id,
			response: resp,
		})
	}

	// Prepare results, and then Generic.run() would actually fill it
	addons.forEach(function(addon) {
		if (isSupported(addon.manifest, 'stream', type, id)) {
			handle.pushResult({
				isReady: false,
				addon: addon,
				resource: 'stream',
				type: type,
				id: id,
				response: null,
			})
		}
	})

	handle.getAllStreams = function() {
		return handle.results.map(function(x) {
			if (!(x.response && Array.isArray(x.response.streams))) return []
			return x.response.streams.map(function(stream) {
				return { stream: stream, addon: x.addon }
			})
		})
		.reduce(function(a, b) { return a.concat(b) }, [ ])
	}

	return handle
}

// because all stremio clients support youtube natively,
// we don't actually call the add-on, just return a ready response
function getPreResponse(type, id) {
	// video id are formed like that: yt_id:YT_CHANNEL_ID:YT_VIDEO_ID
	if (type === 'channel' && id.indexOf('yt_id:') === 0) {
		return { streams: [{ yt_id: id.split(':')[2] }] }
	}
}

module.exports = Streams