const tape = require('tape')

const isCatalogSupported = require('../lib/isCatalogSupported')

tape('isCatalogSupported: simple catalog', function(t) {
	t.equal(isCatalogSupported({ type: 'movie', id: 'top' }, null), true, 'simple catalog, no extra')
	t.end()
})


tape('isCatalogSupported: extraSupported', function(t) {
	// all properties in extra should be in catalog.extraSupported
	t.equal(isCatalogSupported({ type: 'movie', id: 'top', extraSupported: ['search'] }, null), true, 'no extra: should match')
	t.equal(isCatalogSupported({ type: 'movie', id: 'top', extraSupported: ['search'] }, { genre: 'test' }), false, 'extra does not match')
	t.equal(isCatalogSupported({ type: 'movie', id: 'top', extraSupported: ['search'] }, { genre: 'test', search: 'test' }), false, 'extra does not match')
	t.equal(isCatalogSupported({ type: 'movie', id: 'top', extraSupported: ['search'] }, { search: 'test' }), true, 'extra matches')
	t.end()
})

tape('isCatalogSupported: extraRequired', function(t) {
	// all properties in catalog.extraRequired should be in extra
	t.equal(isCatalogSupported({ type: 'movie', id: 'top', extraRequired: ['search'] }, null), false, 'no extra: should not match')
	t.equal(isCatalogSupported({ type: 'movie', id: 'top', extraRequired: ['search'] }, { search: 'test' }), true, 'extra matches')

	// additionally, if there are any other props in extra, they should be checked against catalog.extraSupported
	t.equal(isCatalogSupported({ type: 'movie', id: 'top', extraRequired: ['search'], extraSupported: ['search'] }, { search: 'test', genre: 'foo' }), false, 'does not support genre')
	t.equal(isCatalogSupported({ type: 'movie', id: 'top', extraRequired: ['search'], extraSupported: ['search', 'genre'] }, { search: 'test', genre: 'foo' }), true, 'does support genre')

	t.end()
})
