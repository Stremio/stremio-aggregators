const Generic = require('./generic')
const isSupported = require('./isSupported')

function Streams(addons, type, id) {
	if (! (this instanceof Streams))
		throw 'must call Streams as a constructor'

	const handle = this
	Generic.apply(this)

	// Prepare results, and then Generic.run() would actually fill it
	addons.forEach(function(addon) {
		if (isSupported(addon.manifest, 'stream', type, id)) {
			const resp = getPreResponse(type, id)
			handle.pushResult({
				isReady: !!resp,
				addon: addon,
				resource: 'stream',
				type: type,
				id: id,
				response: resp,
			})
		}
	})
	
	// @TODO: .getAllStreams()

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