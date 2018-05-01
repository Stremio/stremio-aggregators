function isCatalogSupported(catalog, extra) {
	// all props in `catalog.extraRequired` MUST be in `extra`
	if (catalog.extraRequired) {
		if (! extra) return false

		if (!catalog.extraRequired.every(function(prop) {
			return extra.hasOwnProperty(prop)
		})) return false
	}

	// all props in `extra` MUST be in `catalog.extraSupported`
	if (catalog.extraSupported) {
		if (! extra) return true

		if (!Object.keys(extra).every(function(prop) {
			return catalog.extraSupported.indexOf(prop) > -1
		})) return false
	}

	return true
}

module.exports = isCatalogSupported