const Generic = require('./lib/generic')
const Catalogs = require('./lib/catalogs')
const Streams = require('./lib/streams')
const Metas = require('./lib/metas')

const getStreamsCached = require('./lib/getStreamsCached')

module.exports = {
	Generic: Generic,
	Catalogs: Catalogs,
	Streams: Streams,
	Metas: Metas,

	getStreamsCached: getStreamsCached,
}