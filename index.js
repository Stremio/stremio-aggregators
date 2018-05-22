const Generic = require('./lib/generic')
const Catalogs = require('./lib/catalogs')
const Streams = require('./lib/streams')
const Metas = require('./lib/metas')

const getCached = require('./lib/getCached')

module.exports = {
	Generic: Generic,
	Catalogs: Catalogs,
	Streams: Streams,
	Metas: Metas,

	getCached: getCached,

	getStreamsCached: getCached(Streams),
	getMetasCached: getCached(Metas),
}