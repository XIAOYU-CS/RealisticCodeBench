from typing import List


def extract_octaves_and_roots_from_midi(midi_notes: List[int])->dict:
    """
    Splits a list of MIDI note numbers into separate lists of octaves and root notes.

    Args:
        midi_notes (List[int]): A list of MIDI note numbers.

    Returns:
        dict: A dictionary containing lists of octaves and root notes.
    """
