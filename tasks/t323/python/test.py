import unittest
class TestListESStepPrime(unittest.TestCase):

    def test_move_right_with_non_empty_right_tape(self):
        current = ListES(l=[1, 2], r=[3, 4], m=0, s=0)
        trans = Trans(nxt=1, dir=1, out=5)

        result = list_es_step_prime(trans, current)

        self.assertEqual(result, ListES(l=[5, 1, 2], r=[4], m=3, s=1))

    def test_move_right_with_empty_right_tape(self):
        current = ListES(l=[1], r=[], m=0, s=0)
        trans = Trans(nxt=2, dir=1, out=2)

        result = list_es_step_prime(trans, current)

        self.assertEqual(result, ListES(l=[2, 1], r=[], m=Σ0, s=2))

    def test_move_left_with_non_empty_left_tape(self):
        current = ListES(l=[3, 4], r=[5], m=0, s=0)
        trans = Trans(nxt=3, dir=-1, out=6)

        result = list_es_step_prime(trans, current)

        self.assertEqual(result, ListES(l=[4], r=[6, 5], m=3, s=3))

    def test_move_left_with_empty_left_tape(self):
        current = ListES(l=[], r=[7, 8], m=0, s=0)
        trans = Trans(nxt=4, dir=-1, out=9)

        result = list_es_step_prime(trans, current)

        self.assertEqual(result, ListES(l=[], r=[9, 7, 8], m=Σ0, s=4))

    def test_no_movement(self):
        current = ListES(l=[10], r=[11], m=0, s=0)
        trans = Trans(nxt=5, dir=0, out=12)

        result = list_es_step_prime(trans, current)

        self.assertEqual(result, ListES(l=[10], r=[11], m=12, s=5))