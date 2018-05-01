const tape = require('tape')

const isCatalogSupported = require('../lib/isCatalogSupported')

tape('isCatalogSupported: simple catalog', function(t) {
	t.equal(isCatalogSupported({ type: 'movie', id: 'top' }, null), true, 'simple catalog, no extra')
	t.end()
})


tape('isCatalogSupported: extraSupported', function(t) {
	// all properties in extra should be in catalog.extraSupported
	t.equal(isCatalogSupported(genCatalog(['search']), null), true, 'no extra: should match')
	
	t.equal(isCatalogSupported(genCatalog(['search']), { search: 'foo' }), true, 'extra matches')
	t.equal(isCatalogSupported(genCatalog(['search', 'genre']), { genre: 'foo' }), true, 'extra matches')
	
	t.equal(isCatalogSupported(genCatalog(['search']), { genre: 'foo', search: 'foo' }), false, 'extra does not match')
	t.equal(isCatalogSupported(genCatalog(['search']), { genre: 'foo' }), false, 'extra does not match')

	t.end()
})

tape('isCatalogSupported: extraRequired', function(t) {
	// all properties in catalog.extraRequired should be in extra
	t.equal(isCatalogSupported(genCatalog(['search'], ['search']), null), false, 'no extra: should not match')
	t.equal(isCatalogSupported(genCatalog(['search'], ['search']), { genre: 'foo' }), false, 'extra does not contain search: should not match')
	t.equal(isCatalogSupported(genCatalog(['search'], ['search']), { search: 'foo' }), true, 'extra matches')

	// additionally, if there are any other props in extra, they should be checked against catalog.extraSupported
	t.equal(isCatalogSupported(genCatalog(['search'], ['search']), { search: 'foo', genre: 'foo' }), false, 'does not support genre')
	t.equal(isCatalogSupported(genCatalog(['search', 'genre'], ['search']), { search: 'foo', genre: 'foo' }), true, 'does support genre')

	t.end()
})

// small helper to stop repeating ourselves
function genCatalog(supported, required) {
	return { type: 'movie', id: 'top', extraSupported: supported, extraRequired: required }
}