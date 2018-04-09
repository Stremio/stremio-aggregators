const events = require('events')

function Generic() {
	const handle = this
	this.evs = new events.EventEmitter()
	this.results = []
	
	let remaining = 0

	// @TODO: handle.loading

	handle.add = function(addon, resource, type, id, resp) {
		++remaining

		//Tthis allows passing already existing response if we have it
		if (resp) {
			setTimeout(function() { onResp(resp) })
			return
		}

		addon.get(resource, type, id)
		.then(onResp)
		.catch(function(err) {
			handle.evs.emit('err', err)
			checkFinished()
		})

		function onResp(resp) {
			handle.results.push({ 
				addon: addon,
				resource: resource,
				type: type,
				id: id,
				response: resp
			})
			handle.evs.emit('updated')
			checkFinished()
		}
	}

	function checkFinished() {
		if (--remaining === 0)
			handle.evs.emit('finished')
	}

	return handle
}

module.exports = Generic