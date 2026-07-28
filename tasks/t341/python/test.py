import os
import tempfile
import unittest


def _vlq(value):
    bytes_ = [value & 0x7f]
    value >>= 7
    while value:
        bytes_.insert(0, (value & 0x7f) | 0x80)
        value >>= 7
    return bytes(bytes_)


def _midi_event(delta, payload):
    return _vlq(delta) + bytes(payload)


def _meta_event(delta, event_type, payload):
    body = bytes(payload)
    return _vlq(delta) + bytes([0xff, event_type]) + _vlq(len(body)) + body


class TestMidiParser(unittest.TestCase):
    def setUp(self):
        self.basic_midi_path = self._create_test_midi([[
            _meta_event(0, 0x51, [0x07, 0xa1, 0x20]),
            _midi_event(0, [0x90, 69, 64]),
            _midi_event(480, [0x80, 69, 64]),
        ]])
        self.silence_midi_path = self._create_test_midi([[
            _midi_event(240, [0x90, 60, 64]),
            _midi_event(480, [0x80, 60, 64]),
        ]])
        self.multi_track_midi_path = self._create_test_midi([
            [_midi_event(0, [0x90, 60, 64]), _midi_event(480, [0x80, 60, 64])],
            [_midi_event(0, [0x90, 64, 64]), _midi_event(480, [0x80, 64, 64])],
        ])

    def tearDown(self):
        for path in [self.basic_midi_path, self.silence_midi_path, self.multi_track_midi_path]:
            if os.path.exists(path):
                os.remove(path)

    def _create_test_midi(self, tracks):
        header = (
            b"MThd"
            + (6).to_bytes(4, "big")
            + (1 if len(tracks) > 1 else 0).to_bytes(2, "big")
            + len(tracks).to_bytes(2, "big")
            + (480).to_bytes(2, "big")
        )
        chunks = []
        for events in tracks:
            body = b"".join(events) + _meta_event(0, 0x2f, [])
            chunks.append(b"MTrk" + len(body).to_bytes(4, "big") + body)

        with tempfile.NamedTemporaryFile(suffix=".mid", delete=False) as f:
            f.write(header + b"".join(chunks))
            return f.name

    def test_basic_functionality(self):
        result = parse_midi_file(self.basic_midi_path)
        self.assertEqual(len(result), 1)
        self.assertEqual(len(result[0]), 1)
        frequency, duration = result[0][0]
        self.assertAlmostEqual(frequency, 440.0, delta=0.1)
        self.assertAlmostEqual(duration, 500, delta=10)

    def test_include_silence_parameter(self):
        with_silence = parse_midi_file(self.silence_midi_path)
        self.assertEqual(len(with_silence[0]), 2)
        self.assertEqual(with_silence[0][0][0], 0)

        without_silence = parse_midi_file(self.silence_midi_path, include_silence=False)
        self.assertEqual(len(without_silence[0]), 1)

    def test_include_note_number_parameter(self):
        without_numbers = parse_midi_file(self.basic_midi_path)
        self.assertEqual(len(without_numbers[0][0]), 2)

        with_numbers = parse_midi_file(self.basic_midi_path, include_note_number=True)
        self.assertEqual(len(with_numbers[0][0]), 3)
        self.assertEqual(with_numbers[0][0][2], 69)

    def test_multi_track_handling(self):
        result = parse_midi_file(self.multi_track_midi_path)
        self.assertEqual(len(result), 2)
        self.assertEqual(len(result[0]), 1)
        self.assertEqual(len(result[1]), 1)

    def test_error_handling(self):
        with self.assertRaises(FileNotFoundError):
            parse_midi_file("nonexistent_file.mid")
        with tempfile.NamedTemporaryFile(suffix=".mid", delete=False) as f:
            f.write(b"Not a MIDI file")
            path = f.name
        try:
            with self.assertRaises(RuntimeError):
                parse_midi_file(path)
        finally:
            os.remove(path)
