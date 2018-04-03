const Generic = require('./lib/generic')
const Catalogs = require('./lib/catalogs')
const Streams = require('./lib/streams')


module.exports = {
	Generic: Generic,
	Catalogs: Catalogs,
	Streams: Streams,

	// TEMP
	AddonCollection: require('./lib/addon-collection')
}