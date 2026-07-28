describe('extractOctavesAndRootsFromMidi', () => {
    test('correctly separates MIDI notes into octaves and root notes', () => {
        const midiNotes = [60, 61, 62];  // C4, C#4, D4
        const expected = {
            octaveNotes: [5, 5, 5],  // All notes are in the 5th octave
            rootNotes: [0, 1, 2]     // Root notes are C, C#, D
        };
        expect(extractOctavesAndRootsFromMidi(midiNotes)).toEqual(expected);
    });

    test('handles single MIDI note input', () => {
        const midiNotes = [24];  // C1
        const expected = {
            octaveNotes: [2],  // 2nd octave
            rootNotes: [0]     // C note
        };
        expect(extractOctavesAndRootsFromMidi(midiNotes)).toEqual(expected);
    });

    test('returns empty arrays for an empty input array', () => {
        const midiNotes = [];
        const expected = {
            octaveNotes: [],
            rootNotes: []
        };
        expect(extractOctavesAndRootsFromMidi(midiNotes)).toEqual(expected);
    });

    test('handles MIDI notes from different octaves', () => {
        const midiNotes = [12, 25, 37];  // C1, C#2, D#3
        const expected = {
            octaveNotes: [1, 2, 3],  // 1st, 2nd, and 3rd octaves
            rootNotes: [0, 1, 1]     // Root notes are C, C#, D#
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
