var Streams = require('./streams')

var lastId = null
var lastAggr = null

function getStreamsCached(addons, type, vidId) {
	// @TODO: hash-in the actual addons

	var id = type+'/'+vidId

	if (lastId === vidId && lastAggr) {
		return lastAggr
	}

	if (lastAggr) {
		lastAggr.evs.removeAllListeners()
	}

	lastId = vidId
	lastAggr = new Streams(addons, type, vidId)	
	lastAggr.run()

	return lastAggr
}

module.exports = getStreamsCached