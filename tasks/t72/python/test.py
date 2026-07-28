import unittest
import json

class TestBitSequenceEncoder(unittest.TestCase):
    def test_basic_encoding(self):
        data = {'name': 'Processor', 'bits': 255}
        result = json.dumps(data, cls=BitSequenceEncoder)
        self.assertEqual(result, '{"name": "Processor", "bits": "11111111"}')

    def test_nested_encoding(self):
        data = {'component': {'name': 'ALU', 'bits': 128}, 'bits': 1}
        result = json.dumps(data, cls=BitSequenceEncoder)
        self.assertEqual(result, '{"component": {"name": "ALU", "bits": "10000000"}, "bits": "00000001"}')

    def test_non_bits_key(self):
        data = {'name': 'Processor', 'value': 123}
        result = json.dumps(data, cls=BitSequenceEncoder)
        self.assertEqual(result, '{"name": "Processor", "value": 123}')

    def test_no_bits_conversion_needed(self):
        data = {'name': 'Unit', 'bits': 'Already binary'}
        result = json.dumps(data, cls=BitSequenceEncoder)
        self.assertEqual(result, '{"name": "Unit", "bits": "Already binary"}')

    def test_complex_structure_with_bits(self):
        data = {
            'processor': {'bits': 3, 'type': 'A'},
            'memory': {'bits': 255, 'size': 16},
            'ports': {'count': 2, 'bits': 128}
        }
        result = json.dumps(data, cls=BitSequenceEncoder)
        self.assertEqual(result, '{"processor": {"bits": "00000011", "type": "A"}, "memory": {"bits": "11111111", "size": 16}, "ports": {"count": 2, "bits": "10000000"}}')
