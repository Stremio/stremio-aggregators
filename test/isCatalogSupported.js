var tape = require('tape')

var isCatalogSupported = require('../lib/isCatalogSupported')

tape('isCatalogSupported: simple catalog', function(t) {
	t.equal(isCatalogSupported({ type: 'movie', id: 'top' }, null), true, 'simple catalog, no extra')
	t.end()
})


function testExtraSupported(t, genCatalog) {
	// all properties in extra should be in catalog.extraSupported
	t.equal(isCatalogSupported(genCatalog(['search']), null), true, 'no extra: should match')
	
	t.equal(isCatalogSupported(genCatalog(['search']), { search: 'foo' }), true, 'extra matches')
	t.equal(isCatalogSupported(genCatalog(['search', 'genre']), { genre: 'foo' }), true, 'extra matches')
	
	t.equal(isCatalogSupported(genCatalog(['search']), { genre: 'foo', search: 'foo' }), false, 'extra does not match')
	t.equal(isCatalogSupported(genCatalog(['search']), { genre: 'foo' }), false, 'extra does not match')

	t.end()
}

function testExtraRequired(t, genCatalog) {
	// all properties in catalog.extraRequired should be in extra
	t.equal(isCatalogSupported(genCatalog(['search'], ['search']), null), false, 'no extra: should not match')
	t.equal(isCatalogSupported(genCatalog(['search'], ['search']), { genre: 'foo' }), false, 'extra does not contain search: should not match')
	t.equal(isCatalogSupported(genCatalog(['search'], ['search']), { search: 'foo' }), true, 'extra matches')

	// additionally, if there are any other props in extra, they should be checked against catalog.extraSupported
	t.equal(isCatalogSupported(genCatalog(['search'], ['search']), { search: 'foo', genre: 'foo' }), false, 'does not support genre')
	t.equal(isCatalogSupported(genCatalog(['search', 'genre'], ['search']), { search: 'foo', genre: 'foo' }), true, 'does support genre')

	t.end()
}

// Test short notation
tape('isCatalogSupported: extraSupported', function(t) { testExtraSupported(t, genCatalog) })
tape('isCatalogSupported: extraRequired', function(t) { testExtraRequired(t, genCatalog) })

// Test full notation
tape('isCatalogSupported: extra (full notation): supported', function(t) { testExtraSupported(t, genCatalogFullNotation) })
tape('isCatalogSupported: extra (full notation): required', function(t) { testExtraRequired(t, genCatalogFullNotation) })

// small helper to stop repeating ourselves
function genCatalog(supported, required) {
	return { type: 'movie', id: 'top', extraSupported: supported, extraRequired: required }
}
function genCatalogFullNotation(supported, required) {
	return {
		type: 'movie',
		id: 'top',
		extra: supported.map(function(name) {
			return {
				name: name,
				isRequired: required ? required.includes(name) : false,
			}
		})
	}
}
