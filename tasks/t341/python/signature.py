def parse_midi_file(
        midi_file_path,
        include_silence=True,  # Whether to include silence segments in results
        include_note_number=False,  # Whether to retain original MIDI note numbers
        default_tempo=120  # Default tempo in BPM if no tempo info in file
):
    """
    Parses a MIDI file and returns track information with note frequencies and durations.

    Args:
        midi_file_path (str): Path to the MIDI file
        include_silence (bool): Include silence segments as (0, duration_ms) if True
        include_note_number (bool): Include original MIDI note number in results if True
        default_tempo (int): Default tempo in BPM used when no tempo information exists

    Returns:
        list: List of tracks, each containing note information as tuples
              (frequency, duration_ms) or (frequency, duration_ms, note_number)
    """