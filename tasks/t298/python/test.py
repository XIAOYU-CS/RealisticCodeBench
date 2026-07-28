import math
import unittest


class Tester(unittest.TestCase):
    wheelbase = 2.5

    def test_normal_case(self):
        angular_velocity = 1.0
        speed = 10.0
        expected_angle = math.atan((angular_velocity * self.wheelbase) / speed)
        self.assertAlmostEqual(calculate_steering_angle(angular_velocity, speed, self.wheelbase), expected_angle)

    def test_zero_speed(self):
        angular_velocity = 1.0
        speed = 0.0
        with self.assertRaises(ValueError):
            calculate_steering_angle(angular_velocity, speed, self.wheelbase)

    def test_negative_speed(self):
        angular_velocity = 1.0
        speed = -5.0
        with self.assertRaises(Exception):
            calculate_steering_angle(angular_velocity, speed, self.wheelbase)

    def test_zero_angular_velocity(self):
        angular_velocity = 0.0
        speed = 10.0
        expected_angle = 0.0  # Steering angle should be zero
        self.assertAlmostEqual(calculate_steering_angle(angular_velocity, speed, self.wheelbase), expected_angle)

    def test_large_values(self):
        angular_velocity = 100.0
        speed = 1000.0
        expected_angle = math.atan((angular_velocity * self.wheelbase) / speed)
        self.assertAlmostEqual(calculate_steering_angle(angular_velocity, speed, self.wheelbase), expected_angle)

    def test_high_angular_velocity(self):
        angular_velocity = 10.0
        speed = 1.0
        expected_angle = math.atan((angular_velocity * self.wheelbase) / speed)
        self.assertAlmostEqual(calculate_steering_angle(angular_velocity, speed, self.wheelbase), expected_angle)
