/**
 * Convert the question in RDF JSON-LD format to NGSI-LD format
 *
 * @param {string} rdfJsonld - RDF JSON-LD formatted question as a string.
 * @return {Object} Data formatted according to NGSI-LD specifications.
 */
function rdfJsonLdToNgsiLd(rdfJsonld) {
    const data = typeof rdfJsonld === 'string' ? JSON.parse(rdfJsonld) : rdfJsonld;
    return {
        id: data['@id'] ?? 'urn:ngsi-ld:unknown:id',
        type: data['@type'] ?? 'UnknownType',
        '@context': data['@context'] ?? 'https://schema.lab.fiware.org/ld/context',
        attributes: Object.entries(data)
            .filter(([key]) => !['@context', '@id', '@type'].includes(key))
            .map(([name, value]) => ({type: 'Property', name, value})),
    };
}
