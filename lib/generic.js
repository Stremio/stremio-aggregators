const events = require('events')

function Generic() {
	const handle = this
	this.evs = new events.EventEmitter()
	this.results = []
	
	let remaining = 0

	// @TODO: handle.loading

	handle.add = function(addon, resource, type, id) {
		++remaining
		addon.get(resource, type, id)
		.then(function(resp) {
			handle.results.push({ 
				addon: addon,
				resource: resource,
				type: type,
				id: id,
				response: resp
			})
			handle.evs.emit('updated')
			checkFinished()
		})
		.catch(function(err) {
			handle.evs.emit('error', err)
			checkFinished()
		})
	}

	function checkFinished() {
		if (--remaining === 0)
			handle.evs.emit('finished')
	}

	return handle
}

module.exports = Generic