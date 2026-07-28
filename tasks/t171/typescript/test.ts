describe('extractOctavesAndRootsFromMidi', () => {
    test('correctly separates MIDI notes into octaves and root notes', () => {
        const midiNotes: number[] = [60, 61, 62];
        const expected = {
            octaveNotes: [5, 5, 5],
            rootNotes: [0, 1, 2]
        };
        expect(extractOctavesAndRootsFromMidi(midiNotes)).toEqual(expected);
    });

    test('handles single MIDI note input', () => {
        const midiNotes: number[] = [24];
        const expected = {
            octaveNotes: [2],
            rootNotes: [0]
        };
        expect(extractOctavesAndRootsFromMidi(midiNotes)).toEqual(expected);
    });

    test('returns empty arrays for an empty input array', () => {
        const midiNotes: number[] = [];
        const expected = {
            octaveNotes: [],
            rootNotes: []
        };
        expect(extractOctavesAndRootsFromMidi(midiNotes)).toEqual(expected);
    });

    test('handles MIDI notes from different octaves', () => {
        const midiNotes: number[] = [12, 25, 37];
        const expected = {
            octaveNotes: [1, 2, 3],
            rootNotes: [0, 1, 1]
        };
        expect(extractOctavesAndRootsFromMidi(midiNotes)).toEqual(expected);
    });

    test('handles MIDI boundary notes and invalid values', () => {
        expect(extractOctavesAndRootsFromMidi([0, 127])).toEqual({
            octaveNotes: [0, 10],
            rootNotes: [0, 7]
        });
        expect(() => extractOctavesAndRootsFromMidi([60, 60.5])).toThrow(TypeError);
    });
});
