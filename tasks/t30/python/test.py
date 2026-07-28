import  unittest
from math import comb


class TestProbabilityOfRedBalls(unittest.TestCase):
    def test_valid_probability_calculation(self):
        result = probability_of_red_balls(10, 20, 10)
        self.assertIsInstance(result, float)
        self.assertGreaterEqual(result, 0.0)
        self.assertLessEqual(result, 1.0)

    def test_impossible_case_returns_zero(self):

        result = probability_of_red_balls(10, 5, 10)
        self.assertEqual(result, 0.0)

    def test_boundary_case_all_red_balls(self):
        result = probability_of_red_balls(15, 15, 5)
        expected = comb(15, 15) * comb(5, 0) / comb(20, 15)
        self.assertAlmostEqual(result, expected)

    def test_zero_red_balls_requested(self):

        result = probability_of_red_balls(0, 8, 12)
        expected = comb(8, 0) * comb(12, 15) / comb(20, 15)
        self.assertEqual(result, 0.0)

    def test_draw_more_than_total_balls(self):
        result = probability_of_red_balls(5, 5, 8)
        self.assertEqual(result, 0.0)