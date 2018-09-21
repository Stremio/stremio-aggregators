var Generic = require('./lib/generic')
var Catalogs = require('./lib/catalogs')
var Streams = require('./lib/streams')
var Metas = require('./lib/metas')
var isCatalogSupported = require('./lib/isCatalogSupported')
var getCached = require('./lib/getCached')

module.exports = {
	Generic: Generic,
	Catalogs: Catalogs,
	Streams: Streams,
	Metas: Metas,

	getCached: getCached,
	isCatalogSupported: isCatalogSupported,

	getStreamsCached: getCached(Streams),
	getMetasCached: getCached(Metas),
}