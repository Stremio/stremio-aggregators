// manifest, resource, type, id
function isSupported(m, resource, type, id) {
	if (m.resources.indexOf(resource) === -1) return false
	if (m.types.indexOf(type) === -1) return false

	if (Array.isArray(m.idPrefixes)) {
		return m.idPrefixes.some(function(p) {
			return id.indexOf(p) === 0
		})
	}

	return true
}

module.exports = isSupported