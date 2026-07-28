import unittest


class TestQueue(unittest.TestCase):

    def setUp(self):
        self.queue = Queue()

    def test_initialize_empty_queue(self):
        self.assertTrue(self.queue.is_empty())

    def test_enqueue_elements(self):
        self.queue.enqueue(1)
        self.queue.enqueue(2)
        self.queue.enqueue(3)
        self.assertFalse(self.queue.is_empty())

    def test_dequeue_elements(self):
        self.queue.enqueue(1)
        self.queue.enqueue(2)
        dequeued_element = self.queue.dequeue()
        self.assertEqual(dequeued_element, 1)

    def test_front_element(self):
        self.queue.enqueue(10)
        self.queue.enqueue(20)
        front_element = self.queue.front()
        self.assertEqual(front_element, 10)

    def test_check_empty_queue(self):
        self.assertTrue(self.queue.is_empty())
        self.queue.enqueue(5)
        self.assertFalse(self.queue.is_empty())
        self.queue.dequeue()
        self.assertTrue(self.queue.is_empty())
