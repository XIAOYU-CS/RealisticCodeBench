function rdfJsonLdToNgsiLD(rdfJsonLd: string | {[key: string]: any}): any {
  const data = typeof rdfJsonLd === 'string' ? JSON.parse(rdfJsonLd) : rdfJsonLd;
  return {
    id: data['@id'] ?? 'urn:ngsi-ld:unknown:id',
    type: data['@type'] ?? 'UnknownType',
    '@context': data['@context'] ?? 'https://schema.lab.fiware.org/ld/context',
    attributes: Object.entries(data)
      .filter(([key]) => !['@context', '@id', '@type'].includes(key))
      .map(([name, value]) => ({type: 'Property', name, value})),
  };
}
