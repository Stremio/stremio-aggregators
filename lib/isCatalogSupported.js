function isCatalogSupported(catalog, extra) {
	// handle the Full notation
	if (Array.isArray(catalog.extra)) {
		const extraProps = Object.keys(extra || [])
		const satisfiesSupported = extraProps.every(function(prop) {
			return catalog.extra.find(function(e) { return e.name === prop })
		})
		const satisfiesRequired = catalog.extra.every(function(e) {
			return !e.isRequired || extraProps.includes(e.name)
		})
		return satisfiesSupported && satisfiesRequired
	}

	// handle the Short notation
	// all props in `catalog.extraRequired` MUST be in `extra`
	if (catalog.extraRequired) {
		if (!extra) return false

		if (!catalog.extraRequired.every(function(prop) {
			return extra.hasOwnProperty(prop)
		})) return false
	}

	// all props in `extra` MUST be in `catalog.extraSupported`
	if (!extra) return true
	if (!catalog.extraSupported) return false

	return Object.keys(extra).every(function(prop) {
		return catalog.extraSupported.indexOf(prop) > -1
	})
}

module.exports = isCatalogSupported
