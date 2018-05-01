const events = require('events')

function Generic() {
	const handle = this
	handle.evs = new events.EventEmitter()
	handle.results = []
	
	// This expects that we've already pre-filled handle.results with stuff we want to get
	handle.run = function() {
		handle.results.forEach(function(res) {
			// we can add results that are already isReady
			if (res.isReady) return

			res.addon.get(res.resource, res.type, res.id, res.extra)
			.then(function(resp) {
				res.isReady = true
				res.response = resp
				onResultsUpdated()
			})
			.catch(function(err) {
				res.isReady = true
				res.error = err
				handle.evs.emit('err', err)
				onResultsUpdated()
			})
		})

		// in case we've added results that are already isReady, we want to emit updated (and potentially finished)
		setTimeout(onResultsUpdated)
	}

	function onResultsUpdated() {
		if (handle.results.any(function(x) { return x.isReady })) {
			handle.evs.emit('updated')
		}

		if (handle.results.every(function(x) { return x.isReady })) {
			handle.evs.emit('finished')
		}
	}

	return handle
}

module.exports = Generic