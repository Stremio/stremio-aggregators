const events = require('events')

function Generic() {
	const handle = this
	handle.evs = new events.EventEmitter()
	handle.results = []
	
	handle.add = function(addon, resource, type, id, resp) {
		var res = { 
			addon: addon,
			resource: resource,
			type: type,
			id: id,
			isReady: false
		}

		handle.results.push(res)

		// This allows passing already existing response if we have it
		if (resp) {
			res.response = resp
			res.isReady = true
			setTimeout(onResultsUpdated)
			return
		}

		addon.get(resource, type, id)
		.then(function(resp) {
			res.response = resp
			res.isReady = true
			onResultsUpdated()
		})
		.catch(function(err) {
			res.error = err
			res.isReady = true
			handle.evs.emit('err', err)
			onResultsUpdated()
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