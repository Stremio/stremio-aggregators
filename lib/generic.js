const events = require('events')

function Generic() {
	const handle = this
	handle.evs = new events.EventEmitter()
	handle.results = []
	
	// This expects that we've already pre-filled handle.results with stuff we want to get
	handle.run = function() {
		handle.results.forEach(function(res) {
			if (res.isReady) {
				setTimeout(onResultsUpdated)
				return
			}

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
	}

	function onResultsUpdated() {
		handle.evs.emit('updated')

		if (handle.results.every(function(x) { return x.isReady })) {
			handle.evs.emit('finished')
		}
	}

	return handle
}

module.exports = Generic