import unittest


class Tester(unittest.TestCase):

    def setUp(self):
        self.stack = Stack()

    def test_push_and_pop_single_element(self):
        self.stack.push(3.14)
        self.assertEqual(self.stack.pop(), 3.14)
        self.assertTrue(self.stack.is_empty())

    def test_push_multiple_elements_and_peek(self):
        self.stack.push(1.23)
        self.stack.push(4.56)
        self.assertEqual(self.stack.peek(), 4.56)
        self.assertEqual(self.stack.pop(), 4.56)
        self.assertEqual(self.stack.pop(), 1.23)
        self.assertTrue(self.stack.is_empty())

    def test_pop_from_empty_stack_raises(self):
        with self.assertRaises(StackUnderflowError):
            self.stack.pop()

    def test_peek_on_empty_stack_raises(self):
        with self.assertRaises(StackUnderflowError):
            self.stack.peek()

    def test_push_until_full_raises(self):
        full_stack = Stack()
        for i in range(100):
            full_stack.push(float(i) + 0.5)

        with self.assertRaises(StackOverflowError):
            full_stack.push(100.5)
