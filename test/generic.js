const tape = require('tape')

const Generic = require('../lib/generic')

// @TODO: this should be much more extensive,
// but we need to mock add-ons in order to do it

tape('generic: emits proper events', function(t) {
	let aggr = new Generic()

	aggr.results = [
		{ isReady: true, response: null },
		{ isReady: true, response: null }
	]

	// note that .run() is executed first, and we bind to events later
	// we expect that events will be emitted at least one tick after .run()
	aggr.run()

	let numberUpdatedEmitted = 0
	aggr.evs.on('updated', function() {
		t.ok('updated emitted')
		numberUpdatedEmitted++
	})

	aggr.evs.on('finished', function() {
		t.ok('finished emitted')
		t.equal(numberUpdatedEmitted, 1, 'updated emitted only once')
		t.end()
	})
})