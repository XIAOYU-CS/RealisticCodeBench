import unittest
class TestClassifyMemoryMapping(unittest.TestCase):

    def test_heap_mapping(self):
        maps_line = "55c12b4d6000-55c12b4f7000 rw-p 00000000 00:00 0 [heap]"
        result = classify_memory_mapping(maps_line)
        self.assertEqual(result, {'type': 'heap'})

    def test_stack_mapping(self):
        maps_line = "7fff5c1a2000-7fff5c1c3000 rw-p 00000000 00:00 0 [stack]"
        result = classify_memory_mapping(maps_line)
        self.assertEqual(result, {'type': 'stack'})

    def test_vdso_mapping(self):
        maps_line = "7fff5c1c3000-7fff5c1c5000 r-xp 00000000 00:00 0 [vdso]"
        result = classify_memory_mapping(maps_line)
        self.assertEqual(result, {'type': 'vdso'})

    def test_file_backed_mapping(self):
        maps_line = "7f8b8c000000-7f8b8c021000 r--p 00000000 08:01 123456 /lib/x86_64-linux-gnu/libc.so.6"
        result = classify_memory_mapping(maps_line)
        self.assertEqual(result, {'type': 'file'})

    def test_device_mapping(self):
        maps_line = "7f8b8c021000-7f8b8c022000 rw-p 00000000 08:01 789012 /dev/zero"
        result = classify_memory_mapping(maps_line)
        self.assertEqual(result, {'type': 'device'})

    def test_anonymous_mapping(self):
        maps_line = "55c12b4d5000-55c12b4d6000 rw-p 00000000 00:00 0"
        result = classify_memory_mapping(maps_line)
        self.assertEqual(result, {'type': 'anonymous'})

    def test_unknown_mapping(self):
        maps_line = "55c12b4d5000-55c12b4d6000 rw-p 00000000 00:00 0 special_mapping"
        result = classify_memory_mapping(maps_line)
        self.assertEqual(result, {'type': 'unknown'})