function getCached(constr) {
	var lastArgs = null
	var lastAggr = null

	return function(addons, type, vidId) {
		// @TODO: consider moving this into a helper, cmpArgsShallow
		var isSame = lastArgs && (
			!addonsDifferent(lastArgs[0], addons)
			&& lastArgs[1] === type
			&& lastArgs[2] === vidId)

		if (isSame && lastAggr) {
			return lastAggr
		}

		if (lastAggr) {
			lastAggr.evs.removeAllListeners()
		}

		lastArgs = [addons, type, vidId]
		lastAggr = new constr(addons, type, vidId)
		lastAggr.run()

		return lastAggr
	}
}

function addonsDifferent(a, b) {
	if (a.length != b.length) return true
	return a.some(function(x, i) { return b[i].transportUrl != x.transportUrl })
}


module.exports = getCached
