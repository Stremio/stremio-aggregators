const events = require('events')

module.exports = function Generic()
{
	const handle = new events.EventEmitter()
	let remaining = 0

	handle.results = []

	// @TODO: handle.loading
	// @TODO: how do we make special cases, such as Streams being called with pre-ready candidates, or with YouTube

	handle.add = function(addon, resource, type, id) {
		++remaining
		addon.get(resource, type, id)
		.then(function(resp) {
			handle.results.push({ addon: addon, resource: resource, id: id, response: resp })
			handle.emit('updated')
			checkFinished()
		})
		.catch(function(err) {
			handle.emit('error', err)
			checkFinished()
		})
	}

	function checkFinished() {
		if (--remaining === 0)
			handle.emit('finished')
	}

	return handle
}