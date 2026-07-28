/**
 * Parses a MIDI file and returns track information with note frequencies and durations.
 *
 * @param midiFilePath Path to the MIDI file
 * @param includeSilence Include silence segments as (0, duration_ms) if True
 * @param includeNoteNumber Include original MIDI note number in results if True
 * @param defaultTempo Default tempo in BPM used when no tempo information exists
 * @return List of tracks, each containing note information as arrays
 *         [frequency, duration_ms] or [frequency, duration_ms, note_number]
 * @throws IOException if file cannot be read
 * @throws InvalidMidiDataException if MIDI data is invalid
 */
public static List<List<double[]>> parseMidiFile(
        String midiFilePath,
        boolean includeSilence,
        boolean includeNoteNumber,
        int defaultTempo) throws IOException, InvalidMidiDataException {}