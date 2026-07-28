import unittest


class TestSeededRandom(unittest.TestCase):

    def test_consistent_numbers_with_same_seed(self):
        seeded_rand1 = SeededRandom(42)
        seeded_rand2 = SeededRandom(42)
        self.assertAlmostEqual(seeded_rand1.rand(), seeded_rand2.rand(), places=10)
        self.assertAlmostEqual(seeded_rand1.rand(), seeded_rand2.rand(), places=10)
        self.assertAlmostEqual(seeded_rand1.rand(), seeded_rand2.rand(), places=10)

    def test_different_numbers_with_different_seeds(self):
        seeded_rand1 = SeededRandom(42)
        seeded_rand2 = SeededRandom(24)
        self.assertNotAlmostEqual(seeded_rand1.rand(), seeded_rand2.rand(), places=10)

    def test_returns_numbers_between_0_and_1(self):
        seeded_rand = SeededRandom(123456)
        for _ in range(1000):
            rand_value = seeded_rand.rand()
            self.assertGreaterEqual(rand_value, 0)
            self.assertLess(rand_value, 1)

    def test_different_sequences_with_different_seeds(self):
        seeded_rand1 = SeededRandom(123)
        seeded_rand2 = SeededRandom(456)
        sequence1 = [seeded_rand1.rand() for _ in range(5)]
        sequence2 = [seeded_rand2.rand() for _ in range(5)]
        self.assertNotEqual(sequence1, sequence2)

    def test_consistent_sequence_with_same_seed(self):
        seeded_rand = SeededRandom(987654321)
        sequence1 = [seeded_rand.rand() for _ in range(3)]
        seeded_rand2 = SeededRandom(987654321)
        sequence2 = [seeded_rand2.rand() for _ in range(3)]
        self.assertEqual(sequence1, sequence2)
