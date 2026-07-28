describe('RDF JSON-LD to NGSI-LD Conversion', () => {
    it('converts basic RDF JSON-LD', () => {
        const rdfJsonLd = JSON.stringify({
            '@context': 'http://schema.org/',
            '@id': 'urn:ngsi-ld:Vehicle:A123',
            '@type': 'Vehicle',
            speed: {value: 60, unitCode: 'KMH'},
        });

        expect(rdfJsonLdToNgsiLd(rdfJsonLd)).toEqual({
            id: 'urn:ngsi-ld:Vehicle:A123',
            type: 'Vehicle',
            '@context': 'http://schema.org/',
            attributes: [
                {type: 'Property', name: 'speed', value: {value: 60, unitCode: 'KMH'}},
            ],
        });
    });

    it('uses default id and type', () => {
        const rdfJsonLd = JSON.stringify({
            '@context': 'http://schema.org/',
            speed: {value: 60, unitCode: 'KMH'},
        });

        expect(rdfJsonLdToNgsiLd(rdfJsonLd)).toEqual({
            id: 'urn:ngsi-ld:unknown:id',
            type: 'UnknownType',
            '@context': 'http://schema.org/',
            attributes: [
                {type: 'Property', name: 'speed', value: {value: 60, unitCode: 'KMH'}},
            ],
        });
    });

    it('preserves nested object values', () => {
        const rdfJsonLd = JSON.stringify({
            '@context': 'http://schema.org/',
            '@id': 'urn:ngsi-ld:Vehicle:A123',
            '@type': 'Vehicle',
            location: {latitude: 48.8566, longitude: 2.3522},
        });

        expect(rdfJsonLdToNgsiLd(rdfJsonLd)).toEqual({
            id: 'urn:ngsi-ld:Vehicle:A123',
            type: 'Vehicle',
            '@context': 'http://schema.org/',
            attributes: [
                {type: 'Property', name: 'location', value: {latitude: 48.8566, longitude: 2.3522}},
            ],
        });
    });

    it('throws on invalid JSON input', () => {
        expect(() => rdfJsonLdToNgsiLd('This is not a valid JSON')).toThrow(SyntaxError);
    });

    it('handles an empty JSON-LD object', () => {
        expect(rdfJsonLdToNgsiLd(JSON.stringify({}))).toEqual({
            id: 'urn:ngsi-ld:unknown:id',
            type: 'UnknownType',
            '@context': 'https://schema.lab.fiware.org/ld/context',
            attributes: [],
        });
    });
});
