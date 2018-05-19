var Streams = require('./streams')

var lastArgs = null
var lastAggr = null

function getStreamsCached(addons, type, vidId) {
	// @TODO: hash-in the actual addons
	var isSame = lastArgs && (
		lastArgs[0] === addons
		&& lastArgs[1] === type
		&& lastArgs[2] === vidId)

	if (isSame && lastAggr) {
		return lastAggr
	}

	if (lastAggr) {
		lastAggr.evs.removeAllListeners()
	}

	lastArgs = [addons, type, vidId]
	lastAggr = new Streams(addons, type, vidId)	
	lastAggr.run()

	return lastAggr
}

module.exports = getStreamsCached