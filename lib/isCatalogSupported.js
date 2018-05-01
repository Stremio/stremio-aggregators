function isCatalogSupported(catalog, extra) {
	// all props in `catalog.extraRequired` MUST be in `extra`
	if (catalog.extraRequired) {
		if (! extra) return false

		return catalog.extraRequired.every(function(prop) {
			return extra.hasOwnProperty(prop)
		})
	}

	// all props in `extra` MUST be in `catalog.extraSupported`
	if (catalog.extraSupported) {
		if (! extra) return true

		return Object.keys(extra).every(function(prop) {
			return catalog.extraSupported.indexOf(prpo) > -1
		})
	}

	return true
}

module.exports = isCatalogSupported