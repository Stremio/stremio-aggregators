var tape = require('tape')

var getCached = require('../lib/getCached')

var Streams = require('../lib/streams')


tape('getCached: basic functionality', function(t) {
	var getCachedStreams = getCached(Streams)
		
	var addons = []
	var inst1 = getCachedStreams(addons, '1', '2')
	var inst2 = getCachedStreams(addons, '1', '2')

	t.ok(inst1 instanceof Streams, 'inst1 is instance of constructor')
	t.ok(inst1, 'returns inst1')
	t.ok(inst2, 'returns inst2')
	t.equal(inst1, inst2, 'inst1 is same as inst2')

	var inst3 = getCachedStreams(addons, '1', '3')

	t.notEqual(inst1, inst3, 'inst3 is not the same as the others')

	t.end()
})