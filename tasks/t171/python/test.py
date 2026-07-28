import unittest


class TestSeparateOctaveAndRoot(unittest.TestCase):

    def test_correctly_separates_midi_notes(self):
        midi_notes = [60, 61, 62]
        expected = {
            'octaveNotes': [5, 5, 5],
            'rootNotes': [0, 1, 2]
        }
        self.assertEqual(extract_octaves_and_roots_from_midi(midi_notes), expected)

    def test_handles_single_midi_note_input(self):
        midi_notes = [24]  # C1
        expected = {
            'octaveNotes': [2],
            'rootNotes': [0]
        }
        self.assertEqual(extract_octaves_and_roots_from_midi(midi_notes), expected)

    def test_returns_empty_arrays_for_empty_input_array(self):
        midi_notes = []
        expected = {
            'octaveNotes': [],
            'rootNotes': []
        }
        self.assertEqual(extract_octaves_and_roots_from_midi(midi_notes), expected)


    def test_handles_midi_notes_from_different_octaves(self):
        midi_notes = [12, 25, 37]
        expected = {
            'octaveNotes': [1, 2, 3],
            'rootNotes': [0, 1, 1]
        }
        self.assertEqual(extract_octaves_and_roots_from_midi(midi_notes), expected)

    def test_handles_midi_boundary_notes_and_invalid_values(self):
        expected = {
            'octaveNotes': [0, 10],
            'rootNotes': [0, 7]
        }
        self.assertEqual(extract_octaves_and_roots_from_midi([0, 127]), expected)

        with self.assertRaises(TypeError):
            extract_octaves_and_roots_from_midi([60, 60.5])
