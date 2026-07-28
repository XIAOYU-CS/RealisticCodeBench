type NoteInfo = [number, number] | [number, number, number];

/**
 * Parses a MIDI file and returns track information with note frequencies and durations.
 */
function parseMidiFile(
    midiFilePath: string,
    includeSilence: boolean = true,
    includeNoteNumber: boolean = false,
    defaultTempo: number = 120
): NoteInfo[][] {}
